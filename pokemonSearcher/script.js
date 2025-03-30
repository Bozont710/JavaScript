const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const nameElement = document.getElementById("pokemon-name");
const idElement = document.getElementById("pokemon-id");
const weightElement = document.getElementById("weight");
const heightElement = document.getElementById("height");
const spriteElement = document.getElementById("pokemon-sprite");
const typesElement = document.getElementById("types");
const hpElement = document.getElementById("hp");
const attackElement = document.getElementById("attack");
const defenseElement = document.getElementById("defense");
const specialAttackElement = document.getElementById("special-attack");
const specialDefenseElement = document.getElementById("special-defense");
const speedElement = document.getElementById("speed");

const pokeUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
let pokeArr = [];

searchButton.addEventListener("click", () => {
  spriteElement.innerHTML = "";
  typesElement.innerHTML = "";
  let value = searchInput.value;
  const isId = nameOrId(value);
  if (isId) {
    value = parseInt(value)
    getPokemonById(value);
  } else {
    value = cleanName(value);
    getPokemonByName(value);
  }
})

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    spriteElement.innerHTML = "";
    typesElement.innerHTML = "";
    let value = searchInput.value;
    const isId = nameOrId(value);
    if (isId) {
      value = parseInt(value)
      getPokemonById(value);
    } else {
      value = cleanName(value);
      getPokemonByName(value);
    }
  }
})

const cleanName = (value) => {
  value = value.toLowerCase();
  const regexPattern = /\s/g;
  return value.replace(regexPattern, "-");
}

const nameOrId = (value) => {
  const idRegex = /\d/;
  return idRegex.test(value);
}

const getPokemonById = (id) => {
  let filteredPokeArr = pokeArr.filter((elem) => elem.id === id);
  if (filteredPokeArr[0] !== undefined) {
    fetch(filteredPokeArr[0].url)
      .then((res) => res.json())
      .then((data) => {
        unPackPokemon(data);
      })
  } else {
    alert("Pokémon not found");
    searchInput.value = "";
  }
}

const getPokemonByName = (value) => {
  let filteredPokeArr = pokeArr.filter((elem) => elem.name === value);
  console.log(filteredPokeArr)
  if (filteredPokeArr[0] !== undefined) {
    fetch(filteredPokeArr[0].url)
      .then((res) => res.json())
      .then((data) => {
        unPackPokemon(data);
      })
  } else {
    alert("Pokémon not found");
    searchInput.value = "";
  }
}
const unPackPokemon = (data) => {
  let {
    base_experience,
    height,
    id,
    name,
    order,
    sprites,
    stats,
    types,
    weight
    } = data;
    sprites = sprites.front_default;
    let displayStats = {};
    for (const stat of stats) {
      if(!displayStats[stat.stat.name]) {
        displayStats[stat.stat.name] = stat.base_stat;
      }
    }
    let displayTypes = [];
    for (const type of types) {
      if(!displayTypes[type.type.name]) {
        displayTypes.push(type.type.name);
      }
    }

    displayPokemon(name, id, weight, height, sprites, displayTypes, displayStats);
}

const displayPokemon = (name, id, weight, height, sprites, displayTypes, displayStats) => {
  nameElement.innerText = name.toUpperCase();
  idElement.innerText = `#${id}`;
  weightElement.innerText = `Weight: ${weight}`;
  heightElement.innerText = `Height: ${height}`;
  spriteElement.innerHTML += `<img id="sprite" src="${sprites}" alt="${name} sprite" />`
  for (const elem of displayTypes) {
    typesElement.innerHTML += `<span id="type-${elem}">${elem.toUpperCase()}</span>`
  }
  hpElement.innerText = displayStats.hp;
  attackElement.innerText = displayStats.attack;
  defenseElement.innerText = displayStats.defense;
  specialAttackElement.innerText = displayStats['special-attack'];
  specialDefenseElement.innerText = displayStats['special-defense'];
  speedElement.innerText = displayStats.speed;
  
}


fetch(pokeUrl)
  .then((res) => res.json())
  .then((data) => {
    pokeArr = data.results;
  })
  .catch((err) => {
    console.log(err);
})

