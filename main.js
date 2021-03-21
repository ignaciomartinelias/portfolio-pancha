// project cover animation with gsap

function animateFrom(elem, direction) {
  direction = direction | 1;

  var x = 0,
    y = direction * 100;
  const hasFromLeft = elem.classList.contains("gs_reveal_fromLeft");
  const hasFromRight = elem.classList.contains("gs_reveal_fromRight");
  if (hasFromLeft) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
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

const projects = document.querySelectorAll(".project");
const main = document.querySelector("main");
// const mainProjectContainer = document.querySelector(".main-project");

projects.forEach((project, i) => {
  const cover = project.querySelector(".project__cover");
  const content = project.querySelector(".project__content");
  const container = project.querySelector(".container");



  cover.addEventListener("click", () => {
    project.classList.add("main-project");
    // main.classList.add("main-project");
    const everythingExceptProject = document.querySelectorAll(`.hero, main > *:not(.main-project)`);
    console.log(everythingExceptProject)

    const styleData = project.getBoundingClientRect();
    // mainProjectContainer.style.top = styleData.top + 100;
    gsap.to(everythingExceptProject, { opacity: 0, duration: .1, ease: 'ease'})
    gsap.to(container, {width: '100%', ease: 'ease', duration: .25})
    gsap.to(project, {top: `${styleData.top}px`, duration: 0, delay: .5, position: 'fixed'})
    gsap.to(everythingExceptProject, { delay: .5, duration: 0, display: 'none'})
    gsap.to(project, {top: 0, duration: .25, delay: .75, paddingTop: 0, ease: 'elastic'})
    

    // let top = project.getBoundingClientRect().top + 
    //       project.ownerDocument.defaultView.pageYOffset
    // console.log(top)
    // console.log(styleData);

    // console.log(everythingExceptProject);

    // var tl = gsap.timeline();
    // tl.to(project, {position: 'fixed', top: styleData.top + 'px'})


    // ,{position: 'fixed', top: 0, ease: 'ease', duration: 1, delay: .25, paddingTop: 0}
    // tl.to(project ,{position: 'fixed', top: 0, ease: 'ease', duration: 1, delay: .25})
    // tl.to(everythingExceptProject, {opacity: 0, duration: .25, ease: 'ease'})


    // everythingExceptProject.forEach(el => el.classList.add('hide'))
    // gsap.to(everythingExceptProject, { opacity: 0, duration: .25, display: "none", height: 0, ease: "ease" });
    // gsap.to(project, { position: "fixed", top: 0, left: 0, duration: 1, ease: "ease" });
    
    // gsap.to(main, {padding: 0, duration: 1, ease: 'ease'})
    // gsap.to(p, {paddingTop: 0, duration: 1, ease: 'ease'})
    // gsap.to(content, {display: 'block', opacity: 1, padding: '50px 0', duration: 1, ease: 'ease'})
    // gsap.to(projectContainer, {width: '100%', duration: 1, ease: 'ease'})

    // padding-top: 0;
    // .project__content {
    //   display: block;
    //   padding: 50px 0;
    // }
    // & > .container {
    //   width: 100%;
    // }
    // gsap.to(everythingExceptProject, {height: 0, duration: 1, ease: 'ease'})
    // gsap.fromTo(cover, {position: 'static', left: 0}, {position: 'absolute', left: 0, duration: 1, ease: 'ease'});
  });
});
