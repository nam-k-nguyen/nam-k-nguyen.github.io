const body = document.querySelector("body");
const master_grid = document.querySelector("#master-grid");
const drop_down = document.querySelector(".dropdown");
const nav_bar = document.querySelector("#nav-bar");
const overlay_panel = document.querySelector('#overlay-panel')

var x = -100;
var y = -100;
var grid_num = 5

// Function to transform the entire grid
function transform_grid() {
  new_page_number = (x * (-1 / 100) + 1) + (y * (-3 / 100));
  grid_num = new_page_number
  master_grid.style.transform = `translateX(${x / 3}%) translateY(${y / 3}%) `
}

pressedRecently = false // Prevent key spammming
window.addEventListener("keydown", (e) => {

  // Prevent key spamming
  if (pressedRecently) { return }
  pressedRecently = true
  setTimeout(() => { pressedRecently = false }, 500)

  // Allow navigation by number keys
  num = parseInt(e.key)
  if (num != NaN) {
    if (num == 0) { pressedRecently = false; return; }
    else if (num <= 3) { x = (num - 1) * (-100); y = (-0) }
    else if (num <= 6) { x = (num - 4) * (-100); y = (-100) }
    else if (num <= 9) { x = (num - 7) * (-100); y = (-200) }
    transform_grid()
  }

  // Allow navigation by arrow keys
  if (e.key.includes("Arrow")) {
    if (e.key.includes("Left") && x < 0) { x += 100 }
    else if (e.key.includes("Up") && y < 0) { y += 100 }
    else if (e.key.includes("Right") && x > -200) { x -= 100 }
    else if (e.key.includes("Down") && y > -200) { y -= 100 }
    transform_grid()
  }

})

drop_down.addEventListener("click", () => {
  nav_bar.classList.toggle("show")
  master_grid.classList.toggle("blur")
  overlay_panel.classList.toggle("background")
})