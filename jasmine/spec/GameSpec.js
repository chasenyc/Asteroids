describe("Game", function () {
  var game = new Asteroids.Game ();
  it("Game#addAsteroids initializes to as many asteroids as the level",
  function () {
    expect(game.asteroids.length).toBe(game.level);
  });

  it("Game#addAsteroid will add one asteroid", function () {
    var asteroidOne = new Asteroids.Asteroid ();
    var asteroidTwo = new Asteroids.Asteroid ();
    game.addAsteroid(asteroidOne);
    expect(game.asteroids.length).toBe((game.level + 1));
    game.addAsteroid(asteroidTwo);
    expect(game.asteroids.length).toBe((game.level + 2));
  });

  it("Game#addBullet will add one bullet", function () {
    var bulletOpts = {
      pos: [1,0],
      vel: [0.5, 0.5],
      game: game
    };
    var bulletOne = new Asteroids.Bullet (bulletOpts);
    var bulletTwo = new Asteroids.Bullet (bulletOpts);
    game.addBullet(bulletOne);
    expect(game.bullets.length).toBe((1));
    game.addBullet(bulletTwo);
    expect(game.bullets.length).toBe((2));
  });

  it("Game#randomPosition is random", function () {
    var posOne = game.randomPosition();
    var posTwo = game.randomPosition();
    expect(posOne !== posTwo).toBe(true);
  });
});
