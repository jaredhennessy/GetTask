use y25qno7e1qf1ncyh;
/*
drop table Tasks;
drop table Users;
*/

DELETE FROM Users WHERE firstName = 'Customer';
DELETE FROM Users WHERE firstName = 'Dev';
INSERT Users (firstName, lastName, email, password, createdAt, updatedAt) VALUES ('Customer','User','jared.hennessy+cust@gmail.com','password1234',CURDATE(),CURDATE());
INSERT Users (firstName, lastName, email, password, createdAt, updatedAt) VALUES ('Dev','User','jared.hennessy+dev@gmail.com','password5678',CURDATE(),CURDATE());

TRUNCATE TABLE Tasks;

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('task API routes','complete get, post, put via sequelize',false,CURDATE(),CURDATE(),CURDATE(),(select id from Users where firstName = 'Dev'),(select id from Users where firstName = 'Customer'));

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('configure passport','signup/login/logout',false,'2020-06-09',CURDATE(),CURDATE(),(select id from Users where firstName = 'Dev'),(select id from Users where firstName = 'Customer'));

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('user list','build users.handlebars',false,'2020-06-17',CURDATE(),CURDATE(),(select id from Users where firstName = 'Dev'),(select id from Users where firstName = 'Customer'));

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('task links','link to update page task.handlebars from rows in list.handlebars',false,'2020-06-18',CURDATE(),CURDATE(),(select id from Users where firstName = 'Dev'),(select id from Users where firstName = 'Customer'));

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('stale tickets','Color-code expired and about-to-expire tasks',false,'2020-06-19',CURDATE(),CURDATE(),(select id from Users where firstName = 'Dev'),(select id from Users where firstName = 'Customer'));

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('seeds','populate tables',true,'2020-06-12',CURDATE(),CURDATE(),NULL,(select id from Users where firstName = 'Customer'));

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('email alerts','configure an email alert when ticket is assigned',false,'2020-07-01',CURDATE(),CURDATE(),NULL,(select id from Users where firstName = 'Customer'));

select * from Users;
select * from Tasks;