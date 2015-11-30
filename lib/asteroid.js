(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    this.pos = pos;
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
    this.game = game;
    this.vel = function () {
      var velX = ((Math.random() * (3)) + 0.1) * (Math.random() < 0.5 ? -1 : 1);
      var velY = ((Math.random() * (3)) + 0.1) * (Math.random() < 0.5 ? -1 : 1);
      return [velX, velY];
    }();

  };
  Asteroid.COLOR = '#ccc';
  Asteroid.RADIUS = 20;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) { otherObject.relocate(); }
    if (otherObject instanceof Asteroids.Bullet) { this.remove(); }
  };

  Asteroid.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Asteroid.prototype.isWrappable = function () {
    return true;
  };

  Asteroid.prototype.remove = function () {

  };

})();
