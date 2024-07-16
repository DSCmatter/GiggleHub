// jokes.js

const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

dotenvExpand.expand(dotenv.config())

// Access environment variables
const API_Key = process.env.API_Key
const API_Host = process.env.API_Host

async function getJoke() {
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(checkbox => checkbox.value);
  
  if (selectedCategories.length > 0) {
    const categoryParam = selectedCategories.join(',');
    const url = `https://jokeapi-v2.p.rapidapi.com/joke/${categoryParam}`;
    const options = {
      method: 'GET',
      headers: {
        'API_Key': API_Key,
        'API_Host': API_Host
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
