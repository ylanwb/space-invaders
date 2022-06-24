const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight;

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;

    const image = new Image();
    image.src = "./img/spaceship.png";
    image.onload = () => {
      const scale = 0.25;
      this.image = image;
      this.width = image.width * scale;
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
    this.draw();
    this.position.x += this.velocity.x;
  }
}

const player = new Player();

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
player.draw();

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();

  if (
    (keys.a.pressed && player.position.x >= 0) ||
    (keys.ArrowLeft.pressed && player.position.x >= 0)
  ) {
    player.velocity.x = -10;
    player.rotation = -0.15;
  } else if (
    (keys.d.pressed && player.position.x + player.width <= canvas.width) ||
    (keys.ArrowRight.pressed &&
      player.position.x + player.width <= canvas.width)
  ) {
    player.velocity.x = 10;
    player.rotation = -0.15;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }
}
animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
      console.log("left");
      keys.a.pressed = true;
      break;
    case "ArrowLeft":
      console.log("left");
      keys.a.pressed = true;
      break;
    case "d":
      console.log("right");
      keys.d.pressed = true;
      break;
    case "ArrowRight":
      console.log("right");
      keys.d.pressed = true;
      break;
    case " ":
      console.log("space");
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      console.log("left");
      keys.a.pressed = false;
      break;
    case "ArrowLeft":
      console.log("left");
      keys.a.pressed = false;
      break;
    case "d":
      console.log("right");
      keys.d.pressed = false;
      break;
    case "ArrowRight":
      console.log("right");
      keys.d.pressed = false;
      break;
    case " ":
      console.log("space");
      break;
  }
});
