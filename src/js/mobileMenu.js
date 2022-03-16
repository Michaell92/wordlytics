export default function mobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("nav-mobile");

  menu.classList.toggle("hideMenu");
  icon.classList.toggle("hideMenu");

  console.log(menu);
}
