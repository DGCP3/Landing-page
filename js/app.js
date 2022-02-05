function createNavLink(section, text) {
  // create list item
  const list = document.createElement("li");
  // create anchor tag
  const link = document.createElement("a");
  // add class to anchor tag
  link.setAttribute("class", "menu__link");
  //  add data-section attribute to anchor tag to scroll to the section
  link.setAttribute("data-section", section);
  // add text to anchor tag to be displayed in the nav
  link.textContent = text;
  list.appendChild(link);
  return list;
}
// create section observer to detect when section is in viewport
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`a[data-section="#${id}"]`);
      // link.classList.toggle("active");👈 this only work if threshold is 1 so i used the ff code
      entry.isIntersecting
        ? link.classList.add("active")
        : link.classList.remove("active");
    });
  },
  { threshold: 0.7 } // 70% of the section is in view before triggering the callback
);
// create nav dynamically with sections
function createMenu() {
  // select nav element
  const navbar = document.querySelector("#navbar__list");
  // select all section available in the page
  const sections = document.querySelectorAll("section");
  // loop over sections and create nav link for each section
  sections.forEach((section) => {
    //id is used by anchor to scroll to the section
    const id = section.getAttribute("id");
    const text = section.dataset.nav;
    navbar.appendChild(createNavLink(`#${id}`, text));
  });
  // loop over sections and add observer to each section
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
      const id = anchor.getAttribute("data-section");
      // get the section
      const section = document.querySelector(id);
      // scroll to the section
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  });
}
scroll();
