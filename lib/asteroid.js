(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game, color, radius, vel, size) {
    this.pos = pos;
    this.color = color || Asteroid.COLOR;
    this.radius = radius || Asteroid.RADIUS;
    this.game = game;
    this.vel = vel || Asteroids.Util.randomVel(1.5, 0.2);
    this.asteroidSize = size || 4;
  };
  Asteroid.COLOR = '#94A0B6';
  Asteroid.RADIUS = 50;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) { otherObject.relocate(); }
    if (otherObject instanceof Asteroids.Bullet) {
      this.split();
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  Asteroid.prototype.isWrappable = function () {
    return true;
  };

  Asteroid.prototype.split = function () {
    this.game.remove(this);
    var consts = Asteroids.Constants;
    if (this.asteroidSize > 2) {
      var newSize = this.asteroidSize - 1;
      var min = consts.asteroidSize[this.asteroidSize].min;
      var max = consts.asteroidSize[this.asteroidSize].max;
      var color = consts.asteroidSize[this.asteroidSize].color;
      var newVel = Asteroids.Util.randomVel(max, min);
      var newRadius = this.radius / 1.5;
      var newVelTwo = [newVel[0]*-1, newVel[1]*-1];
      var partOne = new Asteroid (this.pos.slice(0), this.game, color, newRadius + 2, newVel, newSize);
      var partTwo = new Asteroid (this.pos.slice(0), this.game, color, newRadius, newVelTwo, newSize);
      this.game.addAsteroid(partOne);
      this.game.addAsteroid(partTwo);
    }
  };

})();
