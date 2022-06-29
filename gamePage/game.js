const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// const canvasWidth = document.getElementsByClassName("middlePart")

canvas.height = document.body.clientHeight;
// canvas.height = window.innerHeight

canvas.width = document.body.clientWidth;

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

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

    if (this.image)
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
  }
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}

class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;

    this.radius = 4 ;
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
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };

    this.velocity = {
      x: 3,
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
    console.log(this.invaders);
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
const grids = [new Grid()];
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

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    } else {
      projectile.update();
    }
  });

  grids.forEach((grid) => {
    grid.update();
    grid.invaders.forEach((invader, i) => {
      invader.update({ velocity: grid.velocity });

      projectiles.forEach((projectile, j) => {
        if (
          projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x &&
          projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            const invaderFound = grid.invaders.find((invader2) => {
              return invader2 === invader;
            });
            const projectileFound = projectiles.find(
              projectile2 => projectile2 === projectile
            )
            // remove invader and projectile
            if (invaderFound && projectileFound) {
              grid.invaders.splice(i, 1);
              projectiles.splice(j, 1);

              if (grid.invaders.length > 0) {
                const firstInvader = grid.invaders[0]
                const lastInvader = grid.invaders[grid.
                ]
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
  // if (frames % 1000 === 0){
  //   grids.push(new Grid())
  // }

  // frames++
}
animate();

addEventListener("keydown", ({ key }) => {
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
