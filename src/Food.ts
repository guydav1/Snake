class Food {
	x: number;
	y: number;
	w: number;
	h: number;
	spawnTime: number;
	constructor() {
		this.x = 0;
		this.y = 0;
		this.w = 10;
		this.h = 10;
		this.spawnTime = window.performance.now();
	}

	render() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	newPosition(snake: Snake) {
		// while newX && newY on snake keep this 2 lines
		let foodOnSnake: boolean = true;
		while (foodOnSnake) {
			let newPos: Point = this.generateRandomLocation();
			if (snake.x != newPos.x || snake.y != newPos.y) {
				if (snake.tail.length > 0) {
					for (const p of snake.tail) {
						if (p.x != newPos.x || p.y != newPos.y) {
							foodOnSnake = false;
						} else {
							foodOnSnake = true;
							break;
						}
					}
				} else {
					foodOnSnake = false;
				}
			}
			if (!foodOnSnake) {
				this.x = newPos.x;
				this.y = newPos.y;
				this.spawnTime = window.performance.now();
			}
		}
		//if pass
	}

	checkTimeout(timeInMs: number) {
		return window.performance.now() > this.spawnTime + timeInMs ? true : false;
	}

	private generateRandomLocation() {
		return new Point(
			Math.floor((Math.random() * canvas.width) / this.w) * this.w,
			Math.floor((Math.random() * canvas.height) / this.h) * this.h
		);
	}
}
