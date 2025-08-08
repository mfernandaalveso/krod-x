const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150';

const pokemonListEl = document.getElementById('pokemonList');
const searchInput = document.getElementById('search');
const logoutBtn = document.getElementById('btnLogout');

// Verifica se há um usuário logado
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!loggedUser) {
  // Se não tiver usuário logado, redireciona para a tela de login
  window.location.href = "login.html";
}

let allPokemons = [];

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon-card');

  const img = document.createElement('img');
  img.src = pokemon.imageUrl;
  img.alt = pokemon.name;

  const name = document.createElement('div');
  name.classList.add('pokemon-name');
  name.textContent = `${capitalizeFirstLetter(pokemon.name)} (#${pokemon.id})`;

  const typesContainer = document.createElement('div');
  typesContainer.classList.add('pokemon-types');
  pokemon.types.forEach(type => {
    const typeEl = document.createElement('div');
    typeEl.classList.add('pokemon-type');
    typeEl.textContent = type;
    typesContainer.appendChild(typeEl);
  });

  const details = document.createElement('div');
  details.classList.add('pokemon-details');
  details.innerHTML = `
    <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
    <p><strong>Habilidades:</strong> ${pokemon.abilities.join(', ')}</p>
  `;

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(typesContainer);
  card.appendChild(details);

  return card;
}

async function fetchPokemonDetails(url) {
  const res = await fetch(url);
  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.other['official-artwork'].front_default,
    types: data.types.map(t => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(a => a.ability.name)
  };
}

async function loadPokemons() {
  const res = await fetch(apiUrl);
  const data = await res.json();

  const promises = data.results.map(p => fetchPokemonDetails(p.url));
  allPokemons = await Promise.all(promises);

  displayPokemons(allPokemons);
}

function displayPokemons(pokemons) {
  pokemonListEl.innerHTML = '';
  pokemons.forEach(pokemon => {
    const card = createPokemonCard(pokemon);
    pokemonListEl.appendChild(card);
  });
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allPokemons.filter(p => p.name.toLowerCase().includes(query));
  displayPokemons(filtered);
});

document.getElementById("btnLogout").addEventListener("click", () => {
  // Apenas "desloga" o usuário removendo o login atual
  localStorage.removeItem("loggedUser");

  // Redireciona para a tela de login
  window.location.href = "login.html";
});

loadPokemons();
