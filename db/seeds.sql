-- use y25qno7e1qf1ncyh;
-- use q6xtchcfp2jx97a1;
use task_tracker;
/*
drop table Tasks;
drop table Users;
*/

DELETE FROM Users WHERE firstName NOT IN ('Jared','Alyssa','Daniel','Tyler','Steve');
-- INSERT Users (firstName, lastName, email, password, createdAt, updatedAt) VALUES ('Steve','Customer','jared.hennessy+cust@gmail.com','password1234',CURDATE(),CURDATE());
-- INSERT Users (firstName, lastName, email, password, createdAt, updatedAt) VALUES ('Daniel','Villarroel','jared.hennessy+dv@gmail.com','password5678',CURDATE(),CURDATE());
-- INSERT Users (firstName, lastName, email, password, createdAt, updatedAt) VALUES ('Alyssa','Hellrung','jared.hennessy+ah@gmail.com','password5678',CURDATE(),CURDATE());
-- INSERT Users (firstName, lastName, email, password, createdAt, updatedAt) VALUES ('Tyler','McBride','jared.hennessy+tm@gmail.com','password5678',CURDATE(),CURDATE());

UPDATE Users
-- SET color = 'teal';
SET color = CASE firstName
WHEN 'Jared' THEN 'teal'
WHEN 'Alyssa' THEN 'purple'
WHEN 'Daniel' THEN 'blue'
WHEN 'Tyler' THEN 'orange'
END;

SET @lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in finibus eros, at egestas diam. Etiam consequat hendrerit nunc, in auctor tortor fringilla at. Mauris venenatis a mi et nullam sodales.';
set @creatorId = (select id from Users where lastName = 'Customer');
set @jared = (select id from Users where firstName = 'Jared');
set @alyssa = (select id from Users where firstName = 'Alyssa');
set @daniel = (select id from Users where firstName = 'Daniel');
set @tyler = (select id from Users where firstName = 'Tyler');
TRUNCATE TABLE Tasks;

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('configure mysql',@lorem,false,CURDATE(),CURDATE(),CURDATE(),@alyssa,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('configure nodemailer',@lorem,false,CURDATE(),CURDATE(),CURDATE(),@jared,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('configure passport',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@daniel,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create seeds.sql',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@alyssa);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create schema.sql',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@alyssa);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create model index',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@tyler);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create task model',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@tyler);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create user model',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@tyler);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('install dependencies',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@tyler);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('establish materialize framework',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@daniel,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('build custom CSS',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@tyler,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('obtain stock images',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create index.js',@lorem,false,CURDATE(),CURDATE(),CURDATE(),@jared,@daniel);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create list.js',@lorem,false,CURDATE(),CURDATE(),CURDATE(),@daniel,@daniel);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create login.js',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@tyler,@daniel);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('include materialize.js',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@tyler,@daniel);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create new.js',@lorem,false,CURDATE(),CURDATE(),CURDATE(),@tyler,@daniel);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create signup.js',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@tyler,@daniel);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create task.js',@lorem,false,CURDATE(),CURDATE(),CURDATE(),@jared,@daniel);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create users.js',@lorem,false,CURDATE(),CURDATE(),CURDATE(),null,@daniel);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create passport api routes',@lorem,false,CURDATE(),CURDATE(),CURDATE(),@tyler,@alyssa);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create main.handlebars',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@daniel,@jared);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create index.handlebars',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@daniel,@jared);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create new.handlebars',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@daniel,@jared);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create signup.handlebars',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@daniel,@jared);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create task.handlebars',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@daniel,@jared);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create users.handlebars',@lorem,false,CURDATE(),CURDATE(),CURDATE(),null,@jared);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('configure environment variables',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('establish git repo',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@jared,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('configure heroku',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@jared,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('configure travis CI',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@jared,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('configure JAWS MySQL',@lorem,false,CURDATE(),CURDATE(),CURDATE(),@jared,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('build server.js',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('build controller.js',@lorem,true,CURDATE(),CURDATE(),CURDATE(),@alyssa,@creatorId);

INSERT Tasks (title, description, complete, estCompletion, createdAt, updatedAt, assigneeId, creatorId)
VALUES ('create README.md',@lorem,false,CURDATE(),CURDATE(),CURDATE(),@alyssa,@alyssa);

UPDATE Tasks
SET estCompletion = null
WHERE assigneeId IS NULL;

UPDATE Tasks
SET estCompletion = CONCAT('2020-06-',CASE WHEN id > 30 THEN id-30 ELSE id END)
WHERE assigneeId IS NOT NULL;

select * from Users;
select assigneeId, count(*) from Tasks group by assigneeId;
select creatorId, count(*) from Tasks group by creatorId;
select * from Tasks order by estCompletion DESC;
