var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var dbConnection = mysql.createConnection({
  user: 'root',
  password: 'hr',
  database: 'chat'
});

var openDB = function() {
  dbConnection.connect(function (err) {
    if (err) { console.log('There was an error connecting to db'); return; }
    console.log('Connection to db successful!');
  });
};

var closeDB = function(err) {
  // dbConnection.end(function(err) {
  //   console.log('Connection closed');
  //   // ensures graceful connection end;
  // });
};

// var username = 'Sam';

var queryHash = {
  TAB_USERS: 'username',
  TAB_ROOMS: 'roomname',
  TAB_MESSAGES: 'message'
};

exports.queryPOST = function(table, arr, callback) {
  openDB();
  if (table !== 'TAB_MESSAGES') {
    dbConnection.query('SELECT * FROM ' + table + ' WHERE ' + queryHash[table] + '=?', arr, function(err, result) {

      if (err) { console.log('There was an error selecting on POST'); closeDB(); callback(); return; }

      if (!result.length) {
        dbConnection.query('INSERT INTO ' + table + ' SET ' + queryHash[table] + '=?', arr, function(err) {
          if (err) { console.log('Error on insert'); closeDB(); return err; }
          closeDB();
          callback(err);
        });
      } else {
        closeDB();
        callback(err);
      }
    });
  } else {
    dbConnection.query('INSERT INTO TAB_MESSAGES (message, uid, id_users, id_rooms) VALUES (?, ?, (SELECT id FROM TAB_USERS WHERE username=?), (SELECT id FROM TAB_ROOMS WHERE roomname =?))', arr, callback);
  }
};

exports.queryGET = function (table, callback) {
  openDB();
  dbConnection.query('SELECT a.message, a.uid, a.createdAt,r.roomname FROM tab_messages a INNER JOIN tab_rooms r WHERE r.id = a.id_rooms;', function(err, result) {
    if (err) { console.log('There was an error selecting on GET'); closeDB(); callback(err); return; }
    closeDB();
    callback(null, result);
  });
};

// // Inserting username 'Sam'
// queries('TAB_USERS', ['Sam'], function(err, result) {
//   if (err) { console.log('query failed', err); closeDB(); return err; }
//   console.log('users query worked!');
// });
// // Inserting room 'lobby'
// queries('TAB_ROOMS', ['lobby'], function(err, result) {
//   if (err) { console.log('query failed', err); closeDB(); return err; }
//   console.log('room query worked!');
// });

// var post = ['hello', null, 'Sam', 'lobby'];

// queries('TAB_MESSAGES', post, function(err, result) {
//   if (err) { console.log('query failed', err); closeDB(); return err; }
//   console.log('success posting message!');
// });


// INSERT INTO TAB_USERS (username) VALUES ('Sam');
// INSERT INTO TAB_ROOMS (roomname) VALUES ('lobby');
// INSERT INTO TAB_MESSAGES (message, uid, id_users, id_rooms) VALUES ('hello', '1234', (SELECT id FROM TAB_USERS WHERE username = 'Sam'), (SELECT id FROM TAB_ROOMS WHERE roomname = 'lobby'));

