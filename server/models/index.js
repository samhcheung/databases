var db = require('../db');

module.exports = {
  messages: {
    get: function (table, callback) {
      db.queryGET('TAB_MESSAGES', function(err, result) {
        callback(err, result);
      });

    }, // a function which produces all the messages
    post: function (table, message, callback) {
      // var post = ['hello', null, 'Sam', 'lobby'];
      db.queryPOST('TAB_MESSAGES', message, function() {
        callback();
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (table, username, callback) {
      username = (username ? username : 'unnamed');

      db.queryPOST(table, [username], function() {
        callback();
      });
    }
  }
};

