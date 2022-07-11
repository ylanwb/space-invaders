const playButton = document.getElementById("playBtn");
const leaderBoard = document.getElementById("lBContainer");
const mainContent = document.getElementById("mnContent");
const playBtnLink = document.getElementById("playBtnLink");
const scoreContainer = document.getElementById("scoreCntainer");
const leaderBoardBtn = document.getElementById("leaderBoardBtn");
const userNameValue = document.getElementById("userName");
const placeHolderAfter = document.getElementById('placeHolderAfter')

let userNameCheck;

function checkName(value) {
  if (value === "") {
    userNameCheck = false;
    playButton.style.display = "none";
    leaderBoardBtn.style.display = "none";
    placeHolderAfter.style.display = "none";

  } else if (value !== "" && value.length >= 3) {
    console.log(value);
    placeHolderAfter.style.display = "inline";
    playButton.style.display = "inline";
    leaderBoardBtn.style.display = "inline";
    return (userNameCheck = true);
  }
}
checkName(userNameValue.value);

userNameValue.onkeyup = function () {
  checkName(userNameValue.value);
};

setInterval(flicker, 1000);

function flicker() {
  playButton.style.opacity = 0;
  setTimeout(function () {
    playButton.style.opacity = 100;
  }, 500);
}
leaderBoardBtn.addEventListener("click", function () {
  leaderBoard.style.display = "flex";
    mainContent.style.opacity = "20%";
    mainContent.style.display = "none"
})
document.body.addEventListener("keypress", function (e) {
  var x = e.which;
  var y = String.fromCharCode(x);
  // console.log(` this is the key pressed ${y}`);
  // console.log(` this is the keycode ${x}`);
  if (x == 13 && userNameCheck === true) {
    leaderBoard.style.display = "flex";
    mainContent.style.opacity = "20%";
    mainContent.style.display = "none"
  } else {
    mainContent.style.opacity = "100%";
    leaderBoard.style.display = "none";
    mainContent.style.display = "flex"
  }
  if (x === 32 && userNameCheck === true) {
    localStorage.setItem("userName", JSON.stringify(userNameValue.value));
    playBtnLink.setAttribute("href", "http://127.0.0.1:5500/gamePage/game.html");
    playBtnLink.click();
  }
  //   if ((x ==))
});

// const scoreData = [
//   {
//     rank: ,
//     name: pla,
//     score: ,
//   },
// ];

players.map((data, index) => {
  const rank = index;
  const name = data.name;
  const score = data.score;

  const nameText = document.createElement("span");
  const rankText = document.createElement("span");
  const scoreText = document.createElement("span");

  nameText.innerText = name;
  rankText.innerText = rank;
  scoreText.innerText = score;

  const userScores = document.createElement("div");
  userScores.classList.add("scoreNames");

  scoreContainer.append(userScores);

  userScores.append(rankText);
  userScores.append(nameText);
  userScores.append(scoreText);
});
