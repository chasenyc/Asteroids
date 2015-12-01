(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Constants = Asteroids.Constants = {
    asteroidSize: {
      2: {
        color: '#C9C8C8',
        max: 2,
        min: 1
      },
      3: {
        color: '#702404',
        max: 1.8,
        min: 0.8
      },
      4: {
        color: '#86BD77',
        max: 1.5,
        min: 0.5
      },
    }
  };

})();
