(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Constants = Asteroids.Constants = {
    asteroidSize: {
      2: {
        color: '#A7DBD8',
        max: 2,
        min: 1
      },
      3: {
        color: '#F38630',
        max: 1.8,
        min: 0.8
      },
      4: {
        color: '#69D2E7',
        max: 1.5,
        min: 0.5
      },
    }
  };

})();
