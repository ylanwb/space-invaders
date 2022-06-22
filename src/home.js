const playButton = document.getElementById("playBtn");
const leaderBoard = document.getElementById("lBContainer");
const mainContent = document.getElementById("mnContent");
const playBtnLink = document.getElementById("playBtnLink")
setInterval(flicker, 1000);

function flicker() {
  playButton.style.display = "none";
  setTimeout(function () {
    playButton.style.display = "inline";
  }, 500);
}

// setInterval(flickerTwo, 800)
// function flicker() {
//     playButton.style.display = "none"
// }
// function flickerTwo() {
//     playButton.style.display = "flex"
// }

document.body.addEventListener("keypress", function (e) {
  var x = e.which;
  var y = String.fromCharCode(x);
  console.log(` this is the key pressed ${y}`);
  console.log(` this is the keycode ${x}`);
  if ((x == 13)) {
    leaderBoard.style.display = "flex";
    mainContent.style.opacity = "20%";
  } else {
    mainContent.style.opacity = "100%";
    leaderBoard.style.display = "none";
  }
  if ((x == 32)){
    playBtnLink.setAttribute("href", "../gamePage/game.html")
    playBtnLink.click()
  }
//   if ((x ==))
});
