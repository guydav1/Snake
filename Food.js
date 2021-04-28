"use strict";
var Food = /** @class */ (function () {
    function Food() {
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 10;
        this.spawnTime = window.performance.now();
    }
    Food.prototype.render = function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
    Food.prototype.newPosition = function (snake) {
        // while newX && newY on snake keep this 2 lines
        var foodOnSnake = true;
        while (foodOnSnake) {
            var newPos = this.generateRandomLocation();
            if (snake.x != newPos.x || snake.y != newPos.y) {
                if (snake.tail.length > 0) {
                    for (var _i = 0, _a = snake.tail; _i < _a.length; _i++) {
                        var p = _a[_i];
                        if (p.x != newPos.x || p.y != newPos.y) {
                            foodOnSnake = false;
                        }
                        else {
                            foodOnSnake = true;
                            break;
                        }
                    }
                }
                else {
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
    };
    Food.prototype.checkTimeout = function (timeInMs) {
        return window.performance.now() > this.spawnTime + timeInMs ? true : false;
    };
    Food.prototype.generateRandomLocation = function () {
        return new Point(Math.floor((Math.random() * canvas.width) / this.w) * this.w, Math.floor((Math.random() * canvas.height) / this.h) * this.h);
    };
    return Food;
}());
