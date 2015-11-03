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

  };


  Ship.COLOR = '#c00';
  Ship.RADIUS = 10;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function(impulse) {
    console.log("you got here")
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.firebullet = function () {
    this.game.allObjects.push(new Asteroids.Bullet(this));
  }




})();
