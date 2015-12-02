(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game) {
    this.img = document.getElementById("source");
    this.pos = game.randomPosition();
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.game = game;
    this.vel = [0, 0];
    this.angle = 0;
    this.offsetAngle = 3 * Math.PI / 2;
  };

  Ship.ANGULAR_STEP = Math.PI / 32;
  Ship.COLOR = '#c00';
  Ship.RADIUS = 12;
  Ship.BOOST = 0.25;
  Ship.BULLET_SPEED = 10;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function() {
    var direction = [-Math.cos(this.angle), -Math.sin(this.angle)];
    this.vel[0] += direction[0] * Ship.BOOST;
    this.vel[1] += direction[1] * Ship.BOOST;
  };

  Ship.prototype.rotate = function(right) {
    this.angle += (right ? 1 : -1) * Ship.ANGULAR_STEP;
  };

  Ship.prototype.firebullet = function () {
    if (this.firebullet._lastFire+300 < Date.now() ) {
      var direction = [-Math.cos(this.angle), -Math.sin(this.angle)];
      this.game.addBullet(new Asteroids.Bullet ({
        pos: this.pos.slice(0),
        vel: [direction[0] * Ship.BULLET_SPEED, direction[1] * Ship.BULLET_SPEED],
        game: this.game
      }));
      this.firebullet._lastFire = Date.now();
    }
  };

  Ship.prototype.firebullet._lastFire = Date.now();

  Ship.prototype.isWrappable = function () {
    return true;
  };

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle+this.offsetAngle);
    ctx.translate(-16, -16);
    ctx.drawImage(this.img, 0, 0, 32, 32);
    ctx.restore();
  };

})();
