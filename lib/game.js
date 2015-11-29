(function () {
  
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

   var Game = Asteroids.Game = function () {
     this.asteroids = this.addAsteroids();
     this.ship = new Asteroids.Ship(this);
     this.allObjects = Array.prototype.slice.call(this.asteroids);
     this.allObjects.push(this.ship);
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
    this.allObjects.forEach (function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects.forEach (function (object) {
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
    for (var idx = 0; idx < this.allObjects.length - 1; idx++) {
      for (var idy = idx + 1; idy < this.allObjects.length; idy++) {
        if (this.allObjects[idx].isCollideWith(this.allObjects[idy])) {
          if (this.allObjects[idx] instanceof Asteroids.Ship) {
            this.allObjects[idx].relocate();
          }
          else if (this.allObjects[idy] instanceof Asteroids.Ship) {
            this.allObjects[idy].relocate();
          }
        }
      }
    }
  };

  Game.prototype.remove = function(object) {
    var new_objects = [];
    this.allObjects.forEach(function(el) {
      if (el !== object) {
        new_objects.push(el);
      }
    });
    this.allObjects = new_objects;
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

})();
