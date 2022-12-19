const pokeSearch = document.querySelector("#searchbar");
const viewStats = document.querySelector("#view-stats");

const pokeId = document.querySelector("#poke-id");
const pokeImage = document.querySelector("#poke-image");
const pokeStats = document.querySelector("#poke-stats");
const pokeTypes = document.querySelector("#poke-type");
const statValue = document.querySelectorAll(".stat-value");
const innerBar = document.querySelectorAll(".inner-bar");

//fetches api based on entered pokemon name
const fetchApi = async (pokeName) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`
  );

  if (response.status === 200) {
    const pokeData = await response.json();
    return pokeData;
  }

  return false;
};

//searchbar event listener, for when enter is clicked
pokeSearch.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    // Cancels the default action
    event.preventDefault();
    const pokeData = await fetchApi(event.target.value);

    if (!pokeData) alert("Nonexistent Pokemon");

    // Places pokemon id in the card
    pokeId.innerHTML = "#" + pokeData.id.toString().padStart(3, "0");

    //Places official pokemon artwork in card
    pokeImage.src = pokeData.sprites.other["official-artwork"].front_default;

    //resets
    pokeStats.style.visibility = "hidden";

    //Update pokemon's types
    pokeTypes.innerHTML = "";
    pokeData.types.forEach((type) => {
      console.log(type.type.name);
      let loadedType = document.createElement("span");
      loadedType.innerHTML = type.type.name;
      loadedType.classList.add("poke-type");

      pokeTypes.appendChild(loadedType);
    });

    //Update pokemon's stats
    pokeData.stats.forEach((stat, i) => {
      //inserts stat value
      statValue[i].innerHTML = stat.base_stat.toString().padStart(3, "0");

      //updates stat bar
      innerBar[i].style.width = `${stat.base_stat}%`;
    });
  }
});

// Toggles pokemons base stats
viewStats.addEventListener("click", function () {
  if (pokeStats.style.visibility === "hidden") {
    pokeStats.style.visibility = "visible";
  } else {
    pokeStats.style.visibility = "hidden";
  }
});
