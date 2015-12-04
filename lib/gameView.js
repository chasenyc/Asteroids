(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
      this.game = game;
      this.ctx = ctx;
  };

  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.game.stepInterval = setInterval(this.game.step.bind(this.game, ctx), 20);
    this.game.drawInterval = setInterval(this.game.draw.bind(this.game, ctx), 20);

    setInterval(this.game.handlePressedKeys.bind(this.game), 20);
  };

})();
