import React, { useState, useEffect } from 'react';

function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=g')
      .then(response => response.json())
      .then(data => {
        const filteredMeals = data.meals.map(meal => {
          const { strMeal, ...ingredientsAndQuantities } = meal;
          const ingredients = Object.keys(ingredientsAndQuantities)
            .filter(key => key.includes('strIngredient'))
            .map(ingredientKey => {
              const ingredientIndex = ingredientKey.slice(-1);
              const quantityKey = `strMeasure${ingredientIndex}`;
              const name = meal[ingredientKey];
              const quantity = meal[quantityKey];
              return { name, quantity };
            })
            .filter(({ name }) => name);
          return { strMeal, ingredients };
        });
        setMeals(filteredMeals);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  };

  const mealStyle = {
    background: '#f0f0f0',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  };

  return (
    <div className="App" style={containerStyle}>
      <h1 style={{ textAlign: 'center' }}>Meals starting with 'g'</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {meals.map(({ strMeal, ingredients }) => (
          <li key={strMeal} style={mealStyle}>
            <h2>{strMeal}</h2>
            <ul>
              {ingredients.map(({ name, quantity }) => (
                <li key={name}>
                  {name} - {quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
