import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const mealData = await request.json();
    const { idMeal, strMeal, steps, ingredients } = mealData;

    if (!idMeal) {
      return NextResponse.json({ error: 'Missing meal ID' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src/data/static/featured_meals.json');
    
    // Read existing data
    let featuredMeals = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      featuredMeals = JSON.parse(fileContent);
    }

    // Find if meal already exists
    const index = featuredMeals.findIndex((m: any) => m.idMeal === idMeal);

    const updatedEntry = {
      ...featuredMeals[index], // Keep existing data like Category/Area if any
      idMeal,
      strMeal,
      steps,
      ingredients,
      updatedAt: new Date().toISOString(),
      source: 'AI_AGENT'
    };

    if (index !== -1) {
      // Check if steps are actually different or more detailed
      // To avoid unnecessary writes, we could compare, but user said "overwrite if same"
      featuredMeals[index] = updatedEntry;
    } else {
      featuredMeals.push(updatedEntry);
    }

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(featuredMeals, null, 2));

    console.log(`[Auto-Save] Meal ${idMeal} (${strMeal}) saved to featured_meals.json`);
    
    return NextResponse.json({ success: true, message: `Meal ${idMeal} saved successfully` });
  } catch (error) {
    console.error('[Auto-Save] Error saving meal:', error);
    return NextResponse.json({ error: 'Failed to save meal' }, { status: 500 });
  }
}
