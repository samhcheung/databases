var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('Serving request type ' + req.method + ' for url ' + req.url);
      // console.log(req.body);

      var roomname = req.body.roomname;
      console.log(roomname);
      models.users.post('TAB_ROOMS', roomname, function() {
        console.log('Successfully posted Room');
        var username = req.body.username;
        var message = req.body.message;
        models.messages.post('TAB_MESSAGES', [message, null, username, roomname], function() {});
      });
      // { 
      //   username: 'Valjean',
      //   message: 'In mercy\'s name, three days is all I need.',
      //   roomname: 'Hello'
      // }
      // models.messages.post(req.body.username);

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      console.log('Serving request type ' + req.method + ' for url ' + req.url);
      models.users.post('TAB_USERS', req.body.username, function() {
        res.end();
      });
    }
  }
};

