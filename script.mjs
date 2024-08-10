// jokes.js

const apiKey = import.meta.env.VITE_API_KEY

export async function getJoke() {
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(checkbox => checkbox.value);
  
  if (selectedCategories.length > 0) {
    const url = ' https://v2.jokeapi.dev/joke/Any';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'jokeapi-v2.p.rapidapi.com',
        'User-Agent': 'GiggleHub'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.error) {
        throw new Error(result.message);
      }
      displayJoke(result);
    } catch (error) {
      console.error(error);
      displayError(error.message);
    }
  } else {
    displayError('Please select at least one joke category.');
  }
}

function displayJoke(jokeData) {
  const jokeDisplay = document.getElementById('jokeDisplay');
  jokeDisplay.innerHTML = '';
  if (jokeData.type === 'single') {
    jokeDisplay.innerHTML = `<p class="lead">${jokeData.joke}</p>`;
  } else {
    jokeDisplay.innerHTML = `<p class="lead">${jokeData.setup}</p><p class="fw-bold">${jokeData.delivery}</p>`;
  }
}

function displayError(errorMessage) {
  const jokeDisplay = document.getElementById('jokeDisplay');
  jokeDisplay.innerHTML = `<div class="alert alert-danger">${errorMessage}</div>`;
}
