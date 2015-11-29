(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (ship) {
    this.pos = ship.pos;
    this.vel = ship.vel.slice(0);
    this.color = Bullet.COLOR;
    this.radius = Bullet.RADIUS;
    this.game = ship.game;
  };

  Bullet.COLOR = '#00c';
  Bullet.RADIUS = 3;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.relocate();
    }
  };

})();
