(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var WINDOW_PADDING = 20;
  var WINDOW_HEIGHT = 75;

  var GameView = Asteroids.GameView = function (game, ctx) {
      this.game = game;
      this.game.view = this;
      this.ctx = ctx;
  };

  GameView.prototype.start = function () {


    this.game.stepInterval = setInterval(this.game.step.bind(this.game, this.ctx), 10);
    this.game.drawInterval = setInterval(this.game.draw.bind(this.game, this.ctx), 10);
    window.addEventListener("resize", this.resizeGame.bind(this), false);
    setInterval(this.game.handlePressedKeys.bind(this.game), 10);
    this.resizeGame();
  };

  GameView.prototype.resizeGame = function() {
    var canvas = this.ctx.canvas;
    var width = window.innerWidth - WINDOW_PADDING;
    var height = window.innerHeight - WINDOW_PADDING - WINDOW_HEIGHT;
    canvas.width = width;
    canvas.height = height;
    Asteroids.Game.DIM_X = width;
    Asteroids.Game.DIM_Y = height;
  };

})();
