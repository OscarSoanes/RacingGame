export function start() {
  const btn = document.getElementById("start-btn");

  btn.addEventListener("click", () => {
    const displayMenu = document.getElementById("start-screen");
    displayMenu.classList.add("none");
    return true;
  });
}
