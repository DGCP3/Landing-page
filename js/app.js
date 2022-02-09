function createNavLink(sectionId, text) {
  // create list item
  const list = document.createElement("li");
  // create anchor tag
  const link = document.createElement("a");
  // add class to anchor tag
  link.setAttribute("class", "menu__link");
  link.setAttribute("data-section", sectionId);
  // add text to anchor tag
  link.textContent = text;
  // append anchor tag to list item
  list.appendChild(link);
  // return list item
  return list;
}
let delay; //add slight delay to the nav bar active state to prevent it from flickering
// create section observer to detect when section is in viewport
const sectionObserver = new IntersectionObserver(
  (entries) => {
    if (delay) clearTimeout(delay);
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`a[data-section="${id}"]`);
      entry.target.classList.toggle("your-active-class", entry.isIntersecting);
      if (entry.isIntersecting) {
        delay = setTimeout(() => {
          link.classList.add("nav-active");
        }, 400);
      } else {
        link.classList.remove("nav-active");
      }
    });
  },
  { threshold: 0.7 }
);
/**
 *  get all sections from the DOM, creating a nav link for each section,
 *  then add observer to on each section
 */
function createMenu() {
  const navbar = document.querySelector("#navbar__list");
  const fragment = document.createDocumentFragment();
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const text = section.dataset.nav;
    fragment.appendChild(createNavLink(id, text));
  });
  navbar.appendChild(fragment);
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
createMenu();

function scroll() {
  // select all anchor tags with data-section just to be safe
  const anchors = document.querySelectorAll("a[data-section]");
  // loop over anchor tags and add event listener to each anchor tag
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      // get the section id thats linked to the anchor tag by data-section attribute
      const dataSection = anchor.dataset.section;
      // get the section
      const section = document.getElementById(dataSection);
      // scroll to the section
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  });
}
scroll();
