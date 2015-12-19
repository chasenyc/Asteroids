describe("Util", function () {

  it("Util#inherits should allow a class to be inherited",
    function () {
      var ObjectOne = function () {};
      ObjectOne.prototype.methodOne = function () {};
      var ObjectTwo = function () {};
      Asteroids.Util.inherits(ObjectTwo, ObjectOne);
      var newObjectTwo = new ObjectTwo ();
      expect(typeof newObjectTwo.methodOne).toBe("function");
  });

  it("Util#randomVel should return random velocities each time",
    function () {
      var velOne = Asteroids.Util.randomVel(1,0);
      var velTwo = Asteroids.Util.randomVel(1,0);
      expect(velOne[0] !== velTwo[0] && velOne[1] !== velTwo[1]).toBe(true);
  });

  it("Util#distance should return correct distance between two coordinates",
    function () {
      var posOne = [0,0];
      var posTwo = [3,0];
      var distance = Asteroids.Util.distance(posOne, posTwo);
      var posThree = [0,0];
      var posFour = [3,4];
      var distanceTwo = Asteroids.Util.distance(posThree, posFour);
      expect(distanceTwo).toBe(5);
  });
});
