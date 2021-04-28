"use strict";
var Snake = /** @class */ (function () {
    function Snake(x, y, w, h, yd, xd, eatmyself, tail) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 10; }
        if (h === void 0) { h = 10; }
        if (yd === void 0) { yd = 0; }
        if (xd === void 0) { xd = 0; }
        if (eatmyself === void 0) { eatmyself = false; }
        if (tail === void 0) { tail = []; }
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.yd = yd;
        this.xd = xd;
        this.eatmyself = eatmyself;
        this.tail = tail;
    }
    Snake.prototype.update = function () {
        if (this.tail.length > 0) {
            if (this.tail.length > 1) {
                for (var i = this.tail.length - 1; i > 0; i--) {
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
    };
    Snake.prototype.render = function () {
        var _this = this;
        ctx.fillStyle = "black";
        this.tail.forEach(function (p) {
            ctx.fillRect(p.x, p.y, _this.w, _this.h);
        });
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
    Snake.prototype.eat = function (foodX, foodY) {
        if (this.x == foodX && this.y == foodY) {
            this.tail.push(new Point(this.x, this.y));
            return true;
        }
    };
    Snake.prototype.move = function (dir) {
        if (dir == "left" && this.xd <= 0) {
            this.xd = -this.w;
            this.yd = 0;
        }
        else if (dir == "right" && this.xd >= 0) {
            this.xd = this.w;
            this.yd = 0;
        }
        else if (dir == "down" && this.yd >= 0) {
            this.xd = 0;
            this.yd = this.h;
        }
        else if (dir == "up" && this.yd <= 0) {
            this.xd = 0;
            this.yd = -this.h;
        }
    };
    Snake.prototype.death = function () {
        for (var i = 0; i < this.tail.length; i++) {
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
    };
    return Snake;
}());
