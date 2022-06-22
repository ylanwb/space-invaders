const playButton = document.getElementById("playBtn");
const leaderBoard = document.getElementById("lBContainer");
const mainContent = document.getElementById("mnContent");
const playBtnLink = document.getElementById("playBtnLink");
const scoreContainer = document.getElementById("scoreCntainer");
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
  if (x == 13) {
    leaderBoard.style.display = "flex";
    mainContent.style.opacity = "20%";
  } else {
    mainContent.style.opacity = "100%";
    leaderBoard.style.display = "none";
  }
  if (x == 32) {
    playBtnLink.setAttribute("href", "../gamePage/game.html");
    playBtnLink.click();
  }
  //   if ((x ==))
});

const dummyData = [
  {
    rank: 1,
    name: "testName",
    score: 99,
  },
  {
    rank: 2,
    name: "testName",
    score: 99,
  },
  {
    rank: 3,
    name: "testName",
    score: 99,
  },
  {
    rank: 4,
    name: "testName",
    score: 99,
  },
  {
    rank: 5,
    name: "testName",
    score: 99,
  },
  {
    rank: 6,
    name: "testName",
    score: 99,
  },
  {
    rank: 7,
    name: "testName",
    score: 99,
  },
  {
    rank: 8,
    name: "testName",
    score: 99,
  },
  {
    rank: 9,
    name: "testName",
    score: 99,
  },
];

dummyData.map((data) => {
  const rank = data.rank;
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

  scoreContainer.append(userScores)

  userScores.append(rankText)
  userScores.append(nameText)
  userScores.append(scoreText)

});
