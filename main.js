function addGSAPTransitions() {
  // project cover animation with gsap

  function animateFrom(elem, direction) {
    direction = direction | 1;

    var x = 0,
      y = direction * 100;
    const hasFromLeft = elem.classList.contains("gs_reveal_fromLeft");
    const hasFromRight = elem.classList.contains("gs_reveal_fromRight");
    const isMainProject = elem.classList.contains("main-project");
    if (hasFromLeft) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
    }
    if(!isMainProject) {
      gsap.fromTo(
        elem,
        { x: x, y: y, autoAlpha: 0 },
        {
          duration: hasFromLeft || hasFromRight ? 2 : 1.25,
          x: 0,
          y: 0,
          autoAlpha: 1,
          ease: "expo",
          overwrite: "auto",
          delay: hasFromLeft || hasFromRight ? 0.5 : 0,
        }
      );
    }
  }

  function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem); // assure that the element is hidden when scrolled into view

    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () {
        animateFrom(elem);
      },
      onEnterBack: function () {
        animateFrom(elem, -1);
      },
      onLeave: function () {
        hide(elem);
      }, // assure that the element <i></i>s hidden when scrolled into view
    });
  });
}

const projects = document.querySelectorAll(".project");
const main = document.querySelector("main");
// const mainProjectContainer = document.querySelector(".main-project");

projects.forEach(project => {
  const projectContainer = project.querySelector(".container");
  const cover = project.querySelector(".project__cover");
  const movingElements = cover.querySelectorAll(".gs_reveal");
  const content = project.querySelector(".project__content");
  const backButton = cover.querySelector(".back");

  cover.addEventListener("click", () => {
    if (!project.classList.contains("main-project")) {
      document.body.classList.add("main-project");
      project.classList.add("main-project");
      movingElements.forEach(el => el.classList.add('main-project'))
      const everythingExceptProject = document.querySelectorAll(`.hero, main > *:not(.main-project)`);

      const styleData = project.getBoundingClientRect();
      // mainProjectContainer.style.top = styleData.top + 100;
      const tl = gsap.timeline({
        onReverseComplete: () => {
          document.body.classList.remove("main-project");
          project.classList.remove("main-project");
        },
      });
      tl.to(everythingExceptProject, { opacity: 0, duration: 0.25, ease: "ease" });
      tl.to(projectContainer, { width: "100%", ease: "ease", duration: 0.25 });
      tl.to(project, { top: `${styleData.top}px`, duration: 0, position: "fixed" });
      tl.to(content, { duration: 0, display: "block" });
      // tl.to(everythingExceptProject, { duration: 0, display: "none" });
      tl.to(project, { delay: 0.25, top: 0, bottom: 0, duration: 0.25, paddingTop: 0, ease: "elastic" });
      tl.to(content, { opacity: 1, duration: 0.25, ease: "ease" });
      tl.to(backButton, { display: "block", opacity: 1, duration: 0.25, ease: "ease" });

      backButton.addEventListener("click", () => {
        tl.reverse();
      });
    }
  });
});

addGSAPTransitions();
