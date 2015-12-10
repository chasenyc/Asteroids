(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Constants = Asteroids.Constants = {
    asteroidSize: {
      2: {
        color: '#A7DBD8',
        max: 1.2,
        min: 0.8
      },
      3: {
        color: '#F38630',
        max: 0.9,
        min: 0.5
      },
      4: {
        color: '#69D2E7',
        max: 0.7,
        min: 0.3
      },
    }
  };

})();
