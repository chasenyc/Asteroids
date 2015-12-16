describe("Util", function () {


  it("should allow a class to be inherited", function () {
    var ObjectOne = function () {
      console.log('test');
    };
    ObjectOne.prototype.methodOne = function () {};
    var ObjectTwo = function () {};
    Asteroids.Util.inherits(ObjectTwo, ObjectOne);
    var newObjectTwo = new ObjectTwo ();
    expect(typeof newObjectTwo.methodOne).toBe("function");
  });
});
