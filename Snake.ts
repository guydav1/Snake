class Snake {
	constructor(
		public x: number = 0,
		public y: number = 0,
		public w: number = 10,
		public h: number = 10,
		public yd: number = 0,
		public xd: number = 0,
		public eatmyself: boolean = false,
		public tail: Array<Point> = []
	) {}

	update() {
		if (this.tail.length > 0) {
			if (this.tail.length > 1) {
				for (let i = this.tail.length - 1; i > 0; i--) {
					this.tail[i].x = this.tail[i - 1].x;
					this.tail[i].y = this.tail[i - 1].y;
				}
			}
			// update first tail to the head position
			this.tail[0].x = this.x;
			this.tail[0].y = this.y;
		}

		this.x += this.xd;
		this.y += this.yd;
	}

	render() {
		ctx.fillStyle = "black";
		this.tail.forEach(p => {
			ctx.fillRect(p.x, p.y, this.w, this.h);
		});
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	eat(foodX: number, foodY: number) {
		if (this.x == foodX && this.y == foodY) {
			this.tail.push(new Point(this.x, this.y));
			return true;
		}
	}

	move(dir: string) {
		if (dir == "left" && this.xd <= 0) {
			this.xd = -this.w;
			this.yd = 0;
		} else if (dir == "right" && this.xd >= 0) {
			this.xd = this.w;
			this.yd = 0;
		} else if (dir == "down" && this.yd >= 0) {
			this.xd = 0;
			this.yd = this.h;
		} else if (dir == "up" && this.yd <= 0) {
			this.xd = 0;
			this.yd = -this.h;
		}
	}

	death() {
		for (let i = 0; i < this.tail.length; i++) {
			if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
				this.eatmyself = true;
			}
		}
		if (this.x + this.w > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0 || this.eatmyself) {
			console.log("GAME OVER");

			this.yd = 0;
			this.xd = 0;

			this.x = Math.floor(canvas.width / 2 / this.w) * this.w;
			this.y = Math.floor(canvas.height / 2 / this.h) * this.h;

			this.tail = [];
			this.eatmyself = false;
			return true;
		}
	}
}
