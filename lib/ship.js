(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game) {
    this.pos = game.randomPosition();
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.game = game;
    this.vel = [0, 0];
    this.angle = Math.PI * 3 / 2;
  };

  Ship.ANGULAR_STEP = Math.PI / 32;
  Ship.COLOR = '#c00';
  Ship.RADIUS = 10;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0] * 0.25;
    this.vel[1] += impulse[1] * 0.25;
  };

  Ship.prototype.rotate = function(right) {
    this.angle += (right ? 1 : -1) * Ship.ANGULAR_STEP;
  };

  Ship.prototype.firebullet = function () {
    if (this.firebullet._lastFire+350 < Date.now() ) {
      var newVel = this.vel.slice(0);
      this.game.addBullet(new Asteroids.Bullet ({
        pos: this.pos.slice(0),
        vel: [newVel[0] * 5, newVel[1] * 5],
        game: this.game
      }));
      this.firebullet._lastFire = Date.now();
    }
  };

  Ship.prototype.firebullet._lastFire = Date.now();

  Ship.prototype.isWrappable = function () {
    return true;
  };

})();
