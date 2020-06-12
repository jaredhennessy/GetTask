DELETE FROM users WHERE firstName = 'Customer';
DELETE FROM users WHERE firstName = 'Dev';
INSERT users (firstName, lastName, email, password, createdAt, updatedAt) VALUES ('Customer','User','jared.hennessy+cust@gmail.com','password1234',CURDATE(),CURDATE());
INSERT users (firstName, lastName, email, password, createdAt, updatedAt) VALUES ('Dev','User','jared.hennessy+dev@gmail.com','password5678',CURDATE(),CURDATE());

TRUNCATE TABLE tasks;

INSERT tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('task API routes','complete get, post, put via sequelize',false,CURDATE(),CURDATE(),CURDATE(),(select id from users where firstName = 'Dev'),(select id from users where firstName = 'Customer'));

INSERT tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('configure passport','signup/login/logout',true,'2020-06-09',CURDATE(),CURDATE(),(select id from users where firstName = 'Dev'),(select id from users where firstName = 'Customer'));

INSERT tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('seeds','populate tables',true,'2020-06-12',CURDATE(),CURDATE(),NULL,(select id from users where firstName = 'Customer'));

select * from users;
select * from tasks;

