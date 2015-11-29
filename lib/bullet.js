(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.game = options.game;
    this.color = Bullet.COLOR;
    this.radius = Bullet.RADIUS;
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
