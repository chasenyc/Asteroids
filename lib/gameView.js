(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('w', function () { this.game.ship.power([0, -1]); }.bind(this));
    key('a', function () { this.game.ship.power([-1, 0]); }.bind(this));
    key('s', function () { this.game.ship.power([0, 1]); }.bind(this));
    key('d', function () { this.game.ship.power([1, 0]); }.bind(this));
    key('space', function () { this.game.ship.firebullet(); }.bind(this));
  };

  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    setInterval(this.game.step.bind(this.game), 20);
    setInterval(this.game.draw.bind(this.game, ctx), 20);
    this.bindKeyHandlers();
  };
  
})();
