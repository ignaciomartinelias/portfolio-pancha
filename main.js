function animateFrom(elem, direction) {
  direction = direction | 1;

  var x = 0,
    y = direction * 100;
    const hasFromLeft = elem.classList.contains("gs_reveal_fromLeft")
    const hasFromRight = elem.classList.contains("gs_reveal_fromRight")
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
      delay: hasFromLeft || hasFromRight ? .5 : 0
    }
  );
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
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
      }, // assure that the element is hidden when scrolled into view
    });
  });
});
