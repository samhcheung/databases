DROP DATABASE IF EXISTS `chat`;

CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS `TAB_MESSAGES`;
    
CREATE TABLE `TAB_MESSAGES` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `message` VARCHAR(140) NULL DEFAULT NULL,
  `uid` VARCHAR(10) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `id_users` INTEGER NULL DEFAULT NULL,
  `id_rooms` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/* Create other tables and define schemas for them here! */
DROP TABLE IF EXISTS `TAB_USERS`;
    
CREATE TABLE `TAB_USERS` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(24) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `TAB_ROOMS`;
    
CREATE TABLE `TAB_ROOMS` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `roomname` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/* Foreign Keys */

ALTER TABLE `TAB_MESSAGES` ADD FOREIGN KEY (id_users) REFERENCES `TAB_USERS` (`id`);
ALTER TABLE `TAB_MESSAGES` ADD FOREIGN KEY (id_rooms) REFERENCES `TAB_ROOMS` (`id`);

-- INSERT INTO TAB_USERS (username) VALUES ('Sam');
-- INSERT INTO TAB_ROOMS (roomname) VALUES ('lobby');
-- INSERT INTO TAB_MESSAGES (message, uid, id_users, id_rooms) VALUES ('hello', '1234', (SELECT id FROM TAB_USERS WHERE username = 'Sam'), (SELECT id FROM TAB_ROOMS WHERE roomname = 'lobby'));
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/