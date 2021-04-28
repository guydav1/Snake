let canvas = <HTMLCanvasElement>document.getElementById("canvas");
canvas.width = 200;
canvas.height = 200;
let ctx = canvas.getContext("2d")!;
let foodTimer = <HTMLInputElement>document.getElementById("foodTimer");

const snake = new Snake();
const food = new Food();

let score: number = 0;
let speed: number = 6;

const gameLoop = function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	food.render();
	if (snake.death()) {
		score = 0;
	}

	if (snake.eat(food.x, food.y)) {
		food.newPosition(snake);
		score++;

		if (score % 5 == 0) {
			speed += 2;
		}
	}
	if (foodTimer.checked) {
		if (food.checkTimeout(5000)) {
			food.newPosition(snake);
		}
	}

	snake.update();
	snake.render();

	ctx.fillText("Score: " + score, canvas.width - 48, canvas.height - 3);

	setTimeout(gameLoop, 1000 / speed);
};
setTimeout(gameLoop, 1000 / speed);

window.addEventListener("keydown", event => {
	if (event.code == "ArrowLeft" || event.code == "KeyA") {
		snake.move("left");
	}
	if (event.code == "ArrowRight" || event.code == "KeyD") {
		snake.move("right");
	}
	if (event.code == "ArrowUp" || event.code == "KeyW") {
		snake.move("up");
	}
	if (event.code == "ArrowDown" || event.code == "KeyS") {
		snake.move("down");
	}
});
