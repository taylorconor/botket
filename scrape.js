var page = require('webpage').create(),
    system = require('system'),
    loadInProgress = false,
    testindex = 0,
    debug = false;

if (system.args.length !== 2) {
  console.log("-1");
  phantom.exit();
}

var query = system.args[1];

page.onConsoleMessage = function (msg) {
  if (debug) {
    console.log(msg);
  }
};

page.onLoadStarted = function() {
  loadInProgress = true;
  if (debug) {
    console.log("load started");
  }
};

page.onLoadFinished = function() {
  loadInProgress = false;
  if (debug) {
    console.log("load finished");
  }
};

var steps = [
  function() { // 0
    page.open("https://www.blocket.se/stockholm?q=" + query);
  },
  function() { // 1
    var count = page.evaluate(function() {
      return document.getElementById("item_list").querySelectorAll("#item_list > article").length;
    });
    console.log("" + count);
  }
];

interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    if (debug) {
      console.log("step " + testindex);
    }
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    phantom.exit();
  }
}, 1500);
