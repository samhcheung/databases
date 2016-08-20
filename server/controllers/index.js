var models = require('../models');

var guid = function() {
  var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get('TAB_MESSAGES', function (err, result) {
        res.end(JSON.stringify({results: result}));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log(req.body);
      var roomname = req.body.roomname;
      models.users.post('TAB_ROOMS', roomname, function() {
        var username = req.body.username;
        models.users.post('TAB_USERS', username, function () {
          var message = req.body.message;
          var objectId = guid();
          models.messages.post('TAB_MESSAGES', [message, objectId, username, roomname], function() {
            res.end();
          });
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.users.post('TAB_USERS', req.body.username, function() {
        res.end();
      });
    }
  }
};

