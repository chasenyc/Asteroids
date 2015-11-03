(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Bullet = Asteroids.Bullet = function (ship) {
    this.pos = ship.pos;
    this.vel = [];
    this.color = Bullet.COLOR;
    this.radius = Bullet.RADIUS;
    this.vel[0] = ship.vel[0] * 2;
    this.vel[1] = ship.vel[1] * 2;
    this.game = ship.game;
  };
  Bullet.COLOR = '#00c';
  Bullet.RADIUS = 3;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

})();
