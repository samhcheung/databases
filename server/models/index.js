var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (table, message, callback) {
      // var post = ['hello', null, 'Sam', 'lobby'];
      db.queryPOST('TAB_MESSAGES', message, function(err, result) {
        if (err) { console.log('query failed', err); return err; }
        console.log('success posting message!');
        callback();
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (table, username, callback) {
      db.queryPOST(table, [username], function(err, result) {
        if (err) { console.log('query failed', err); return err; }
        callback();
      });
    }
  }
};

