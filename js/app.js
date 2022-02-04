function createNavLink(href, text) {
  //  create list item
  const list = document.createElement("li");
  // create anchor tag
  const link = document.createElement("a");
  // add class to anchor tag
  link.setAttribute("class", "menu__link");
  // add href to anchor tag with section id as href value to make it scroll to the section
  link.setAttribute("href", href);
  link.textContent = text;
  list.appendChild(link);
  return list;
}
// create section observer to detect when section is in viewport
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`a[href="#${id}"]`);
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
    const id = section.getAttribute("id"); //id is used by anchor to scroll to the section
    const text = section.dataset.nav;
    navbar.appendChild(createNavLink(`#${id}`, text));
  });
  // loop over sections and add observer to each section
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
createMenu();
