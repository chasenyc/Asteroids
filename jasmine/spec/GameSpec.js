describe("Game", function () {
  var game = new Asteroids.Game ();
  it("Game#addAsteroids initializes to as many asteroids as the level",
  function () {
    expect(game.asteroids.length).toBe(game.level);
  });
});
