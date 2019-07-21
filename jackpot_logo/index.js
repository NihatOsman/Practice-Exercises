"use strict";
window.onload = function() {
  var sound = new Howl({
    src: ["fire.mp3"]
  });
  sound.play();

  //Second way
  // var sound = new Audio("sounds/background.mp3");
  // sound.loop = true;
  // sound.play();
  var frames = document.getElementById("animation").children;
  var frameCount = frames.length;
  var i = 0;
  setInterval(function() {
    frames[i % frameCount].style.display = "none";
    frames[++i % frameCount].style.display = "block";
  }, 100);
};
