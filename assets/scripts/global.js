// Show Mobile Menu
let mobileMenu = document.querySelector("header .container nav");
let mobileMenuBtn = document.querySelector("header .controls button");
mobileMenuBtn.onclick = (_) => {
  mobileMenu.classList.toggle("show");
};
