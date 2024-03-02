// jokes.js

async function getJoke() {
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(checkbox => checkbox.value);
  if (selectedCategories.length > 0) {
    const categoryParam = selectedCategories.join(',');
    const url = `https://jokeapi-v2.p.rapidapi.com/joke/${categoryParam}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ffa9fc19admsh7ba1576f57e2c23p162531jsn86179c55ba65',
        'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
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
