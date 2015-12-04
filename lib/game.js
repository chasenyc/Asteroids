(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

   var Game = Asteroids.Game = function () {
     this.level = 1;
     this.hud = document.getElementById("hud");
     this.gameStatus = document.getElementById("game-status");
     this.playerStatus = document.getElementById("player-info");
     this.asteroids = this.addAsteroids();
     this.ship = new Asteroids.Ship(this);
     this.bullets = [];
     this.score = 0;
     this.combo = Date.now();
     this.comboMultiple = 1;
     this.paused = false;
     this.lives = 3;
     this.over = false;
   };

   Game.DIM_X = 500;
   Game.DIM_Y = 500;
   Game.NUM_ASTEROIDS = 1;

   Game.prototype.addAsteroids = function() {
     var asteroids = [];
     for (var idx = 0; idx < this.level; idx++) {
       asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
     }
     return asteroids;
   };

   Game.prototype.addAsteroid = function (asteroid) {
    this.asteroids.push(asteroid);
   };

   Game.prototype.addBullet = function(bullet) {
     this.bullets.push(bullet);
   };

   Game.prototype.randomPosition = function() {
     var x = Math.floor(Math.random() * (Game.DIM_X)) + 1;
     var y = Math.floor(Math.random() * (Game.DIM_Y)) + 1;
     return [x, y];
   };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach (function (object) {
      object.draw(ctx);
    });
    this.drawHud(ctx);
  };

  Game.prototype.drawHud = function (ctx) {
    var _score = "Score: " + this.score;
    if (this.isComboActive() && this.comboMultiple > 1) {
      _score += " combo active! " + this.comboMultiple + "x score!";
    }
    this.hud.innerText = _score;
    this.gameStatus.innerText = (this.paused ? "PAUSED" : "");
    if (this.over) { this.gameStatus.innerText="GAME OVER"; }
    this.playerStatus.innerText = "Lives: " + this.lives;
  };


  Game.prototype.isComboActive = function () {
    if (this.combo + 1000 > Date.now ()) {
      return true;
    }
    return false;
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach (function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function(obj) {
    if (this.needsWrapping(obj.pos)) {
      if (obj.isWrappable()) {
        return [this.wrapNum(obj.pos[0]), this.wrapNum(obj.pos[1])];
      } else {
        this.remove(obj);
      }
    }
    return obj.pos;
  };

  Game.prototype.needsWrapping = function (pos) {
    return (
      pos[0] > Game.DIM_X ||
      pos[0] < 0 ||
      pos[1] > Game.DIM_X ||
      pos[1] < 0
    );
  };

  Game.prototype.wrapNum = function(num) {
    if (num <= 0) {
      return num + Game.DIM_X;
    } else {
      return num % Game.DIM_X;
    }
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
      this.bullets = this.bullets.filter(function (bullet) {
        return bullet !== object;
      });
    } else if (object instanceof Asteroids.Asteroid) {
      this.asteroids = this.asteroids.filter(function (asteroid) {
        return asteroid !== object;
      });
    }
  };

  Game.prototype.step = function () {
    this.handlePressedKeys();
    this.checkOutcomes();
    if (!this.paused) {
      this.moveObjects();
      this.checkCollisions();
    }
  };

  Game.prototype.checkOutcomes = function () {
    if (this.lives < 1) { this.gameOver(); }
    if (this.asteroids.length < 1) { this.nextLevel(); }
  };

  Game.prototype.nextLevel = function () {
    this.level += 1;
    this.asteroids = this.addAsteroids();
    this.ship.setInvincibility();
    console.log(this.level, this.asteroids);
  };

  Game.prototype.gameOver = function () {
    this.over = true;
    this.gameStatus.innerText = "GAME OVER";
    setTimeout(function () {
      clearInterval(this.stepInterval);
      clearInterval(this.drawInterval);
    }.bind(this), 10);
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship], this.bullets);
  };

  Game.prototype.togglePause = function () {
    if (this.paused) {
      this.combo = Date.now();
    }
    if (this.togglePause._lastPause + 100 < Date.now()) {
      this.paused = !this.paused;
    }
    this.togglePause._lastPause = Date.now();
  };

  Game.prototype.togglePause._lastPause = Date.now();

  Game.prototype.handlePressedKeys = function () {
    var pressedKeys = key.getPressedKeyCodes();
    if (!this.paused && !this.over) {
      if (pressedKeys.indexOf(87) >= 0) {
        this.ship.power();
      } else {
        this.ship.boosting = false;
      }
      if (pressedKeys.indexOf(65) >= 0) {
        this.ship.rotate(false);
      }

      if (pressedKeys.indexOf(68) >= 0) {
        this.ship.rotate(true);
      }
      if (pressedKeys.indexOf(32) >= 0) { this.ship.firebullet(); }
    }
    if (pressedKeys.indexOf(80) >= 0) { this.togglePause(); }

  };

})();
