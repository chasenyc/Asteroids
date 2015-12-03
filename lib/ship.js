(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game) {
    this.boostImg = document.getElementById("source-boost");
    this.regImg = document.getElementById("source");
    this.boosting = false;
    this.pos = game.randomPosition();
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.game = game;
    this.vel = [0, 0];
    this.angle = 0;
    this.offsetAngle = 3 * Math.PI / 2;
    this.invincible = true;
    this.invincibleStart = Date.now();
  };

  Ship.ANGULAR_STEP = Math.PI / 32;
  Ship.COLOR = '#c00';
  Ship.RADIUS = 12;
  Ship.BOOST = 0.25;
  Ship.BULLET_SPEED = 10;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    if (!this.invincible) {
      this.vel = [0, 0];
      this.pos = this.game.randomPosition();
      this.game.lives -= 1;
      this.invincibleStart = Date.now();
    }
  };

  Ship.prototype.power = function() {
    var direction = [-Math.cos(this.angle), -Math.sin(this.angle)];
    this.vel[0] += direction[0] * Ship.BOOST;
    this.vel[1] += direction[1] * Ship.BOOST;
    this.boosting = true;
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
    this.invincible = ((this.invincibleStart + 3000 > Date.now ()) ? true : false);
    var frequency = 200;
    if (!this.invincible || Math.floor(Date.now() / frequency) % 2) {
      ctx.save();
      ctx.translate(this.pos[0], this.pos[1]);
      ctx.rotate(this.angle+this.offsetAngle);
      ctx.translate(-18, -18);
      ctx.drawImage((this.boosting ? this.boostImg : this.regImg), 0, 0, 36, 36);
      ctx.restore();
    }
  };

})();
