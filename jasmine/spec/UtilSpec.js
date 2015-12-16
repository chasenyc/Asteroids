describe("Util#inherits", function () {

  it("should allow a class to be inherited", function () {
    var ObjectOne = function () {};
    ObjectOne.prototype.methodOne = function () {};
    var ObjectTwo = function () {};
    Asteroids.Util.inherits(ObjectTwo, ObjectOne);
    var newObjectTwo = new ObjectTwo ();
    expect(typeof newObjectTwo.methodOne).toBe("function");
  });
});


describe("Util#randomVel", function () {
  it("should return random velocities each time", function () {
    var velOne = Asteroids.Util.randomVel(1,0);
    var velTwo = Asteroids.Util.randomVel(1,0);
    expect(velOne[0] !== velTwo[0] && velOne[1] !== velTwo[1]).toBe(true);
  });
});
