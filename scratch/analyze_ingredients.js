const axios = require('axios');

async function analyzeTypes() {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const ingredients = response.data.meals;
    const types = new Set();
    
    ingredients.forEach(ing => {
      if (ing.strType) types.add(ing.strType);
    });
    
    console.log('Unique Types:', Array.from(types));
    console.log('Total Ingredients:', ingredients.length);
    console.log('Sample with Types:', ingredients.filter(i => i.strType).slice(0, 5));
  } catch (error) {
    console.error(error);
  }
}

analyzeTypes();
