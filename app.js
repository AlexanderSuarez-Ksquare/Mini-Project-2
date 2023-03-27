//Element Selectors
const container = document.getElementById("container");
const searchBox = document.getElementById("search-box");
const resetButton = document.getElementById("reset-button");

//List of the names of pokémon that will be displayed (These are some of my favorite pokémon)
const pokemonList = [
  "froakie",
  "greninja",
  "piplup",
  "lycanroc-midnight",
  "umbreon",
  "aegislash-blade",
  "manectric",
  "togekiss",
  "eevee",
  "rayquaza",
  "zorua-hisui",
  "politoed",
];

//Function to fetch the information from the API
const fetchPokemon = () => {
  pokemonList.forEach((pokemon) => {
    //The method forEach will create a card that will display the information and image of every pokémon named in the pokemonList array.
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) //Fetch the information of every pokémon in the list
      .then((res) => res.json()) //Gets the info in JSON format
      .then((pokemonData) => {
        const card = createCard(pokemonData); //Then with the information we execute the function createCard and store the return in a variable
        container.appendChild(card); //Append the card in the container so it is showed.
      });
  });
};

//This function creates the pokémon card with the information recived by the JSON.
function createCard(pokemonData) {
  const card = document.createElement("div"); //First a div is created
  card.classList.add("card"); //Then add the class "card" to that div element

  const name = document.createElement("h2"); //Now a h2 element is created and stored in a constant variable called name
  name.textContent = pokemonData.name; //Then the text content of that h2 element is set to the name of the pokémon (from the pokemonData which is the JSON information)

  name.addEventListener("click", () => {
    //Now an event listener for the name element is created, this means that when a pokémon name is clicked it will do the next instructions.
    let pokemonName = pokemonData.name.toLowerCase(); //Create a variable with the name of the pokémon in lower case.
    //Change the names of the pokémon with special forms so the wiki will open properly.
    if (pokemonName === "zorua-hisui") pokemonName = "zorua";
    if (pokemonName === "aegislash-blade") pokemonName = "aegislash";
    const wikiUrl = `https://pokemon.fandom.com/wiki/${pokemonName}`; //Store in a variable the link to the pokémon wiki entry of the pokémon with the stored name.
    window.open(wikiUrl, "_blank"); //with the open method of the window interface we open a new tab with the link stored before.
  });

  const image = document.createElement("img"); //Now an image element is created
  image.src = pokemonData.sprites.front_shiny; //And the source is set to the API link to the shiny front sprite.

  //For the next elements a paragraph is created
  const types = document.createElement("p");
  types.textContent =
    "Type(s): " + pokemonData.types.map((type) => type.type.name).join(", "); //The types of each pokemon comes in an array of objects, so a .map is used to get all the types, and then each type is joined with a comma.

  //For Attack, Defense, HP and Speed elements we use the find method inside the stats array of objects to look for the name of the stat and then, get the base stat of that particular stat.
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

  //Finally i append all these elements to the div created at the beginning of the function that have the card class
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(types);
  card.appendChild(hp);
  card.appendChild(attack);
  card.appendChild(defense);
  card.appendChild(speed);

  return card; //And return the card with all the information.
}

//This is an event listener of the search box that will filter the cards by the name typed.
searchBox.addEventListener("input", () => {
  const filteredList = pokemonList.filter((pokemon) => {
    //I create a variable that will store the filtered pokémon
    return pokemon.includes(searchBox.value.toLowerCase()); //To do this we use the .includes method that will return the pokémon that include in their names the letters of the searchbox after transform it to lower case
  });

  container.innerHTML = ""; //After the user types something in the searchbox the container will erase all the HTML text that it had.

  filteredList.forEach((pokemon) => {
    //Now for each pokemon in the filteredList array i will create the card of that pokemon and append it to the now blank container.
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => res.json())
      .then((pokemonData) => {
        const card = createCard(pokemonData);
        container.appendChild(card);
      });
  });
});

resetButton.addEventListener("click", () => {
  //The reset button event listener will clear the text in the search box and erase all the HTML text that the container had.
  searchBox.value = "";
  container.innerHTML = "";

  fetchPokemon(); //Run the function to display all the 12 original pokémon from the pokemonList array.
});

fetchPokemon(); //Run the fetch so it will display the 12 pokémon when the page loads.
