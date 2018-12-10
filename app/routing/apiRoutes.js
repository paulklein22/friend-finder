// var path = require("path");
var friendArray = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendArray);
  });

  app.post("/api/friends", function(req, res) {
    var friendMatch = {
      name: req.body.name,
      photo: req.body.photo,
      scores: JSON.parse(req.body.scores)
    };

    var diffArray = [];

    friendArray.forEach(function(item, index) {
      var difference = 0;
      for (var i = 0; i < item.scores.length; i++) {
        difference += Math.abs(item.scores[i] - friendMatch.scores[i]);
      }
      diffArray.push({ difference: difference, index: index });
    });

    diffArray.sort(function(a, b) {
      return a.difference - b.difference;
    });

    friendArray.push(friendMatch);
    res.json(friendArray[diffArray[0].index]);
  });
};