/*
use task_tracker;
drop table if exists tasks;
drop table if exists users;
*/
use task_tracker;

SELECT u.id, u.firstName, u.lastName, u.email
, COUNT(DISTINCT CASE WHEN a.complete = 'false' THEN a.id ELSE NULL END) `Open Tickets`
, COUNT(DISTINCT CASE WHEN a.complete = 'true' THEN a.id ELSE NULL END) `Closed Tickets`
, COUNT(DISTINCT c.id) `Created Tickets`
FROM users u
LEFT JOIN tasks a
ON u.id = a.assigneeId
LEFT JOIN tasks c
ON u.id = c.creatorId
GROUP BY u.id, u.firstName, u.lastName, u.email