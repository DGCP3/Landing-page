function createNavLink(href, text) {
  //  create list item
  const list = document.createElement("li");
  // add class to list item
  list.setAttribute("class", "navLink");
  // create anchor tag
  const link = document.createElement("a");
  // add href to anchor tag with section id as href value to make it scroll to the section
  link.setAttribute("href", href);
  link.textContent = text;
  list.appendChild(link);
  console.log(list.children);
  return list;
}
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`a[href="#${id}"]`);
      console.log(id);
      // link.classList.toggle("active");👈 this only work if threshold is 1 so i used the ff code
      entry.isIntersecting
        ? link.classList.add("active")
        : link.classList.remove("active");
    });
  },
  { threshold: 0.7 } // 70% of the section is in view before triggering the callback
);

function createMenu() {
  const navbar = document.querySelector(".navbar__menu");
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const text = section.dataset.nav;
    navbar.appendChild(createNavLink(`#${id}`, text));
  });
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
createMenu();
