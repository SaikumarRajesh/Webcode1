let currentPage = 0;
let offset = 0;
let PAGE_LIMIT = 50;
let API_URL = 'https://pokeapi.co/api/v2/pokemon';

async function pokemon() {
  try {
    let url = `${API_URL}?limit=${PAGE_LIMIT}&offset=${currentPage * PAGE_LIMIT}`;
    let res = await fetch(url);
    let res1 = await res.json();
    console.log(res1);
    
    //  To Clear the existing Pokémon div
    let pokemonDiv = document.getElementById('pokemondiv');
    pokemonDiv.innerHTML = '';

    let l = res1.results.length;
    console.log(l);
  
    for (let i = 0; i < l; i++) {
      let url1 = res1.results[i].url;
      let res2 = await fetch(url1);
      let res3 = await res2.json();

      let div = document.createElement('div');
      div.setAttribute('class', 'card  bg-secondary mb-3 pokemoncard')

      let nameElement = document.createElement('h3');
      nameElement.innerHTML = res3.name;

      let p1Element = document.createElement('p');
      p1Element.innerHTML = `<b>Abilities:</b>`+" "+ res3.abilities.map(ability => ability.ability.name).join(', ');

      let p2Element = document.createElement('p');
      p2Element.innerHTML = `<b>Moves:</b>`+" "+ res3.moves.map(move => move.move.name).join(', ');

      let p3Element = document.createElement('p');
      p3Element.innerHTML = `<b>Weight:</b>`+" "+ res3.weight;

      div.append(nameElement, p1Element, p2Element, p3Element);

      pokemonDiv.append(div);

    }

    let btndiv =document.createElement('div')
    btndiv.setAttribute('class', 'd-flex justify-content-center')

    let prevButton = document.createElement('button');
    prevButton.setAttribute('class', 'btn btn-primary');
    prevButton.innerHTML = 'Previous';

    let nextButton = document.createElement('button');
    nextButton.setAttribute('class', 'btn btn-primary');
    nextButton.innerHTML = 'Next';
    
    btndiv.appendChild(prevButton)
    btndiv.appendChild(nextButton)
    pokemonDiv.append(btndiv);

    function updatePaginationButtons(previousUrl, nextUrl) {
      prevButton.disabled = !previousUrl;
      nextButton.disabled = !nextUrl;

      prevButton.addEventListener('click', () => {
        currentPage -= 1;
        pokemon();
      });

      nextButton.addEventListener('click', () => {
        currentPage += 1;
        pokemon();
      });
    }

    updatePaginationButtons(res1.previous, res1.next);
  }
  catch (error) {
    console.error('An error occurred:', error);
  }
}

pokemon();
