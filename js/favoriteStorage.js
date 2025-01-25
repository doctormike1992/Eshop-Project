export let favorite = JSON.parse(localStorage.getItem("favorite")) || [];

export function saveFavorite() {
  localStorage.setItem("favorite", JSON.stringify(favorite));
}
