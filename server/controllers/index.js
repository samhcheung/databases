var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get('TAB_MESSAGES', function (err, result) {
        console.log('TOP LEVEL', result);
        res.end(JSON.stringify(result));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var roomname = req.body.roomname;
      models.users.post('TAB_ROOMS', roomname, function() {
        var username = req.body.username;
        var message = req.body.message;
        models.messages.post('TAB_MESSAGES', [message, null, username, roomname], function() {
          res.end();
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

