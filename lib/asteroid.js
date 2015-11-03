
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
      var velX = ((Math.random() * (3)) + .1) * (Math.random() < 0.5 ? -1 : 1);
      var velY = ((Math.random() * (3)) + .1) * (Math.random() < 0.5 ? -1 : 1);
      console.log(velX, velY);
      return [velX, velY];
    }();

  }
  Asteroid.COLOR = '#ccc';
  Asteroid.RADIUS = 20;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
})();
