(function () {
  var keyStore = {};

  window.addEventListener("keydown", function (e) {
    keyStore[e.keyCode] = true;
  });

  window.addEventListener("keyup", function (e) {
    keyStore[e.keyCode] = false;
  });

  window.isKeyPressed = function (key) {
    return (keyStore[key]);
  };
})();
