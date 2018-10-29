$(document).ready(function() {
  //Script for Popup
  $(".popup-with-zoom-anim").magnificPopup({
    type: "inline",
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: "auto",
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-zoom-in"
  });

  // script-for-menu
  $("li a.menu1").click(function() {
    $("ul.cl-effect-2").slideToggle(300, function() {
      // Animation complete.
    });
  });
});
