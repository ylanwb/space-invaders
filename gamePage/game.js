const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const finalScoreEl = document.getElementById("finalScoreEl");
const scoreEl = document.getElementById("scoreEl");
const livesEl = document.getElementById("livesEl");
const gameContainer = document.getElementById("gameCntainer");
const gameOverContainer = document.getElementById("gameOverContainer");

// const canvasWidth = document.getElementsByClassName("middlePart");

canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight;

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.opacity = 1;
    const image = new Image();
    image.src = "./img/spaceship.png";
    image.onload = () => {
      const scale = 0.15;
      this.image = image;
      this.width = image.width * scale * 1.5;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 40,
      };
    };
  }
  draw() {
    // c.fillStyle = "red";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.save();
    c.globalAlpha = this.opacity;
    if (this.image)
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    c.restore();
  }
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}

class invaderProjectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;

    this.width = 3;
    this.height = 10;
  }

  draw() {
    c.fillStyle = "white";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;

    this.radius = 4;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "red";
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Particle {
  constructor({ position, velocity, radius, color, fades }) {
    this.position = position;
    this.velocity = velocity;

    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.fades = fades;
  }

  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.fades) this.opacity -= 0.01;
  }
}

class Invader {
  constructor(position) {
    this.velocity = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = "./img/invader.png";
    image.onload = () => {
      const scale = 1.0;
      this.image = image;
      this.width = image.width * scale * 1.5;
      this.height = image.height * scale;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }

  draw() {
    // c.fillStyle = "red";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    if (this.image) {
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }
  update({ velocity }) {
    if (this.image) {
      this.draw();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }
  shoot(invaderProjectiles) {
    invaderProjectiles.push(
      new invaderProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
        velocity: {
          x: 0,
          y: 5,
        },
      })
    );
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };

    this.velocity = {
      x: 7,
      y: 0,
    };

    this.invaders = [];

    const collumn = 15 * 45;
    // const rows = Math.floor(Math.random() * 5 + 2)

    this.width = collumn;

    for (let x = 0; x < 15; x++) {
      for (let y = 0; y < 5; y++) {
        this.invaders.push(
          new Invader({
            x: x * 45,
            y: y * 30,
          })
        );
      }
    }
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.y = 0;

    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y = 30;
    }
  }
}

const player = new Player();
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];
const keys = {
  a: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

let frames = 0;
let game = {
  over: false,
  active: true,
};
let score = 0;
let lives = 3;

for (let i = 0; i < 100; i++) {
  particles.push(
    new Particle({
      position: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      },
      velocity: {
        x: 0,
        y: 0.4,
      },
      radius: Math.random() * 2,
      color: "white",
    })
  );
}

function createParticles({ object, color, fades }) {
  for (let i = 0; i < 15; i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        radius: Math.random() * 3,
        color: color || "#BAA0DE",
        fades,
      })
    );
  }
}

function animate() {
  if (!game.active) return;
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  particles.forEach((particle, i) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = -particle.radius;
    }
    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(i, 1);
      }, 0);
    } else {
      particle.update();
    }
  });
  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
      canvas.height
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
      }, 0);
    } else invaderProjectile.update();
    // projectile hits player
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
        player.position.y &&
      invaderProjectile.position.x + invaderProjectile.width >=
        player.position.x &&
      invaderProjectile.position.x <= player.position.x + player.width
    ) {
      // console.log("you lose");
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
        lives -= 1;
        // console.log(lives);
        livesEl.innerHTML = lives;
      }, 0);
      if (lives <= 1) {
        setTimeout(() => {
          player.opacity = 0;
          game.over = true;
          gameContainer.style.transition = "all 3s";
          gameContainer.style.opacity = 0;
          gameOverContainer.style.transition = "all 3s";
          gameOverContainer.style.top = 0;
          localStorage.setItem("finalScore", score);
        }, 0);
        setTimeout(() => {
          game.active = false;
        }, 2000);
      }
      createParticles({
        object: player,
        color: "white",
        fades: true,
      });
    }
  });

  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    } else {
      projectile.update();
    }
  });

  grids.forEach((grid, gridIndex) => {
    grid.update();
    const randomNumber = Math.floor(Math.random() * grid.invaders.length);
    // spawn invader projectiles
    if (frames % 50 === 0 && score <= 5000 && grid.invaders.length > 0) {
      grid.invaders[randomNumber].shoot(invaderProjectiles);
    }
    // hard mode
    else if (frames % 25 === 0 && score >= 5000 && grid.invaders.length > 0) {
      grid.invaders[randomNumber].shoot(invaderProjectiles);
    }
    // impossible mode
    else if (frames % 10 === 0 && score >= 10000 && grid.invaders.length > 0) {
      grid.invaders[randomNumber].shoot(invaderProjectiles);
    }
    grid.invaders.forEach((invader, i) => {
      invader.update({ velocity: grid.velocity });

      // projectiles hit enemy
      projectiles.forEach((projectile, j) => {
        if (
          projectile.position.y - projectile.radius <=
            invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x &&
          projectile.position.x - projectile.radius <=
            invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            const invaderFound = grid.invaders.find((invader2) => {
              return invader2 === invader;
            });
            const projectileFound = projectiles.find(
              (projectile2) => projectile2 === projectile
            );
            // remove invader and projectile
            if (invaderFound && projectileFound) {
              score += 100;
              scoreEl.innerHTML = score;
              finalScoreEl.innerHTML = score;

              createParticles({
                object: invader,
                fades: true,
              });

              grid.invaders.splice(i, 1);
              projectiles.splice(j, 1);

              if (grid.invaders.length > 0) {
                const firstInvader = grid.invaders[0];
                const lastInvader = grid.invaders[grid.invaders.length - 1];
                grid.width =
                  lastInvader.position.x -
                  firstInvader.position.x +
                  lastInvader.width;
                grid.position.x = firstInvader.position.x;
              } else {
                grids.splice(gridIndex, 1);
              }
            }
          }, 1);
        }
      });
    });
  });

  if (
    (keys.a.pressed && player.position.x >= 0) ||
    (keys.ArrowLeft.pressed && player.position.x >= 0)
  ) {
    player.velocity.x = -10;
  } else if (
    (keys.d.pressed && player.position.x + player.width <= canvas.width) ||
    (keys.ArrowRight.pressed &&
      player.position.x + player.width <= canvas.width)
  ) {
    player.velocity.x = 10;
  } else {
    player.velocity.x = 0;
  }

  // spawning enemies
  const randomInterval = Math.floor(Math.random() * 500 + 500);
  if (frames % randomInterval === 0) {
    grids.push(new Grid());
    frames = 0;
  }

  frames++;
}
animate();

addEventListener("keydown", ({ key }) => {
  if (game.over) return;
  switch (key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "ArrowLeft":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "ArrowRight":
      keys.d.pressed = true;
      break;
    case " ":
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -10,
          },
        })
      );
      // console.log(projectiles)
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "ArrowLeft":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "ArrowRight":
      keys.d.pressed = false;
      break;
    case " ":
      break;
  }
});

var ul = document.getElementById("list");
var liSelected;
var index = -1;

document.addEventListener(
  "keydown",
  function (event) {
    var len = ul.getElementsByTagName("li").length - 1;
    if (event.which === 40) {
      index++;
      //down
      if (liSelected) {
        removeClass(liSelected, "selected");
        next = ul.getElementsByTagName("li")[index];
        if (typeof next !== undefined && index <= len) {
          liSelected = next;
        } else {
          index = 0;
          liSelected = ul.getElementsByTagName("li")[0];
        }
        addClass(liSelected, "selected");
        console.log(index);
      } else {
        index = 0;

        liSelected = ul.getElementsByTagName("li")[0];
        addClass(liSelected, "selected");
      }
    } else if (event.which === 38) {
      //up
      if (liSelected) {
        removeClass(liSelected, "selected");
        index--;
        console.log(index);
        next = ul.getElementsByTagName("li")[index];
        if (typeof next !== undefined && index >= 0) {
          liSelected = next;
        } else {
          index = len;
          liSelected = ul.getElementsByTagName("li")[len];
        }
        addClass(liSelected, "selected");
      } else {
        index = 0;
        liSelected = ul.getElementsByTagName("li")[len];
        addClass(liSelected, "selected");
      }
    }
    // if (event.which === 32 && game.over === true) {
    //   liSelected.click();
    // }
  },
  false
);

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(
      new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
      " "
    );
  }
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += " " + className;
  }
}
