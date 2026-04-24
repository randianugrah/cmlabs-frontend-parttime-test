const axios = require('axios');

async function trackData() {
  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
  
  try {
    // 1. Categories
    const catRes = await axios.get(`${BASE_URL}/categories.php`);
    const categories = catRes.data.categories.map(c => c.strCategory);
    
    // 2. Ingredients
    const ingRes = await axios.get(`${BASE_URL}/list.php?i=list`);
    const ingredients = ingRes.data.meals.map(i => i.strIngredient);
    
    // 3. Areas
    const areaRes = await axios.get(`${BASE_URL}/list.php?a=list`);
    const areas = areaRes.data.meals.map(a => a.strArea);
    
    console.log('--- DATA SUMMARY ---');
    console.log(`Total Categories: ${categories.length}`);
    console.log(`Categories: ${categories.join(', ')}`);
    console.log('\n');
    console.log(`Total Areas: ${areas.length}`);
    console.log(`Areas: ${areas.join(', ')}`);
    console.log('\n');
    console.log(`Total Ingredients: ${ingredients.length}`);
    console.log(`First 20 Ingredients: ${ingredients.slice(0, 20).join(', ')}...`);
    
  } catch (error) {
    console.error('Error tracking data:', error.message);
  }
}

trackData();
