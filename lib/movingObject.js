(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    var oldPos = this.pos;
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this);
  };

  MovingObject.prototype.isCollideWith = function(otherObject) {
    var diffX = this.pos[0] - otherObject.pos[0];
    var diffY = this.pos[1] - otherObject.pos[1];
    var sumRadii = this.radius + otherObject.radius;
    var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return (distance <= sumRadii);
  };


  MovingObject.prototype.collideWith = function() {

  };

})();
