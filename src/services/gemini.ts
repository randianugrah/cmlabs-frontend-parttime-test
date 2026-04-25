/**
 * Gemini AI Translation Service with Caching and Strict Fidelity
 */

const MODEL = "gemini-flash-latest";

export const translateInstructionsWithAI = async (instructions: string, mealId: string): Promise<string[]> => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return [];
  }

  // 1. Check Local Storage Cache first
  const cacheKey = `meal_trans_${mealId}`;
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  const fetchUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  try {
    // 2. Pre-parse instructions to follow original paragraphs/lines only
    const originalSteps = instructions
      .split(/\r\n\r\n|\n\n/) // Try double newlines first (paragraphs)
      .flatMap(p => p.split(/\r\n|\n/)) // Then single newlines
      .map(step => step.trim())
      .filter(step => step.length > 10) // Filter out noise
      .map(step => step.replace(/^\d+[\.\)]\s*/, '')); // Remove original numbers

    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{
            text: "You are a specialized translation engine for a premium cooking app. Your ONLY task is to translate list items into high-fidelity Indonesian. NEVER include introductory or concluding conversational text. NEVER summarize. ALWAYS maintain the exact number of items."
          }]
        },
        contents: [
          {
            parts: [
              {
                text: `Translate these ${originalSteps.length} cooking steps into detailed Indonesian. 
                
                RULES:
                1. KEEP 100% OF THE DETAIL. 
                2. Return ONLY the numbered list.
                3. Each step MUST start with its number (1., 2., etc.).
                
                STEPS TO TRANSLATE:
                ${originalSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      if (response.status === 429) throw new Error("QUOTA_EXCEEDED");
      throw new Error("API_ERROR");
    }

    const data = await response.json();
    console.log("DEBUG: AI Raw Response:", data.candidates?.[0]?.content?.parts?.[0]?.text);
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const translatedText = data.candidates[0].content.parts[0].text;
      
      const steps = translatedText
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => {
          // Hanya ambil baris yang dimulai dengan angka (sebagai langkah)
          return /^\d+[\.\)]/.test(line);
        })
        .map((line: string) => line.replace(/^\d+[\.\)]\s*/, ''));

      console.log("DEBUG: Parsed Steps Count:", steps.length);

      if (steps.length > 0) {
        localStorage.setItem(cacheKey, JSON.stringify(steps));
      }
      
      return steps;
    }
    
    return [];
  } catch (error) {
    if (error instanceof Error && error.message === "QUOTA_EXCEEDED") throw error;
    return [];
  }
};
