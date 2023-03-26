const container = document.getElementById("container");
const pokemonList = [
  "squirtle",
  "totodile",
  "mudkip",
  "piplup",
  "oshawott",
  "froakie",
  "popplio",
  "sobble",
  "quaxly",
  "pikachu",
  "eevee",
  "greninja",
];

// Fetch data for each Pokemon and create a card
pokemonList.forEach((pokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((res) => res.json())
    .then((pokemonData) => {
      const card = createCard(pokemonData);
      container.appendChild(card);
    });
});

// Helper function to create a card for a Pokemon
function createCard(pokemonData) {
  const card = document.createElement("div");
  card.classList.add("card");

  const name = document.createElement("h2");
  name.textContent = pokemonData.name;

  const image = document.createElement("img");
  image.src = pokemonData.sprites.front_shiny;

  const types = document.createElement("p");
  types.textContent =
    "Type(s): " + pokemonData.types.map((type) => type.type.name).join(", ");

  const attack = document.createElement("p");
  attack.textContent =
    "Attack: " +
    pokemonData.stats.find((stat) => stat.stat.name === "attack").base_stat;

  const hp = document.createElement("p");
  hp.textContent =
    "HP: " +
    pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat;

  const defense = document.createElement("p");
  defense.textContent =
    "Defense: " +
    pokemonData.stats.find((stat) => stat.stat.name === "defense").base_stat;

  const speed = document.createElement("p");
  speed.textContent =
    "Speed: " +
    pokemonData.stats.find((stat) => stat.stat.name === "speed").base_stat;

  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(types);
  card.appendChild(hp);
  card.appendChild(attack);
  card.appendChild(defense);
  card.appendChild(speed);

  return card;
}
