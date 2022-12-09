const pokeSearch = document.querySelector("#searchbar");
const pokeId = document.querySelector("#poke-id");
const pokeImage = document.querySelector("poke-image");

//fetches api based on entered pokemon name
const fetchApi = async (pokeName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
  const pokeData = await response.json();

  return pokeData;
};

//searchbar event listener, for when enter is clicked
pokeSearch.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    // Cancels the default action
    event.preventDefault();
  }
  const pokeData = await fetchApi(event.target.value);
  pokeId.innerHTML = pokeData.id;
  //   pokeImage.src = pokeData.sprites
  console.log(pokeData);
});
