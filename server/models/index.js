var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (table, message, callback) {
      // var post = ['hello', null, 'Sam', 'lobby'];
      db.queryPOST('TAB_MESSAGES', message, function(err, result) {
        if (err) { console.log('Query failed', err); return err; }
        callback();
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (table, username, callback) {
      console.log('table', table, 'username', username);
      db.queryPOST(table, [username], function(err, result) {
        if (err) { console.log('Query failed', err); return err; }
        callback();
      });
    }
  }
};

