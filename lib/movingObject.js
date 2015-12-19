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
    // this.pos = this.game.wrap(this);
  };

  MovingObject.prototype.isCollideWith = function(otherObject) {
    var dist = Asteroids.Util.distance(this.pos, otherObject.pos);
    var sumRadii = this.radius + otherObject.radius;
    return (dist <= sumRadii);
  };


  MovingObject.prototype.collideWith = function() {

  };

})();
