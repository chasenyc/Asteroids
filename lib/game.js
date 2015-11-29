(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

   var Game = Asteroids.Game = function () {
     this.asteroids = this.addAsteroids();
     this.ship = new Asteroids.Ship(this);
     this.bullets = [];
   };

   Game.DIM_X = 500;
   Game.DIM_Y = 500;
   Game.NUM_ASTEROIDS = 5;

   Game.prototype.addAsteroids = function() {
     var asteroids = [];
     for (var idx = 0; idx < Game.NUM_ASTEROIDS; idx++) {
       asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
     }
     return asteroids;
   };

   Game.prototype.randomPosition = function() {
     var x = Math.floor(Math.random() * (Game.DIM_X)) + 1;
     var y = Math.floor(Math.random() * (Game.DIM_Y)) + 1;
     return [x, y];
   };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    this.allObjects().forEach (function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach (function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] > Game.DIM_X) {
      pos[0] -= Game.DIM_X;
    }
    else if (pos[0] < 0) {
      pos[0] += Game.DIM_X;
    }

    if (pos[1] > Game.DIM_Y) {
      pos[1] -= Game.DIM_Y;
    }
    else if (pos[1] < 0) {
      pos[1] += Game.DIM_Y;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function () {
    var allObjects = this.allObjects();
    for (var idx = 0; idx < allObjects.length - 1; idx++) {
      for (var idy = idx + 1; idy < allObjects.length; idy++) {
        if (allObjects[idx].isCollideWith(allObjects[idy])) {
          allObjects[idx].collideWith(allObjects[idy]);
        }
      }
    }
  };

  Game.prototype.remove = function(object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.filter(function (bullet) {
        return bullet !== object;
      });
    } else if (object instanceof Asteroids.Asteroid) {
      this.asteroids.filter(function (asteroid) {
        return asteroid !== object;
      });
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship], this.bullets);
  };

})();
