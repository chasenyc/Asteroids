describe("MovingObject", function () {
  var objectOne = new Asteroids.MovingObject ();
  objectOne.radius = 2;
  objectOne.pos = [0,0];
  objectOne.vel = [1,1];
  var objectTwo = new Asteroids.MovingObject ();
  objectTwo.radius = 2;
  objectTwo.pos = [1,1];
  var objectThree = new Asteroids.MovingObject ();
  objectThree.radius = 2;
  objectThree.pos = [5,0];

  beforeEach(function() {

  });

  it("movingObject#isCollideWith returns correct result",
  function () {
    expect(objectOne.isCollideWith(objectTwo)).toBe(true);
    expect(objectOne.isCollideWith(objectThree)).toBe(false);
  });

  it("movingObject#move moves the object the correct amount",
  function () {
    objectOne.move();
    expect(objectOne.pos).toEqual([1,1]);
  });
});
