CREATE TABLE users(
username VARCHAR(30) PRIMARY KEY,
firstname VARCHAR(20) NOT NULL,
lastname VARCHAR(20) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(30) NOT NULL,
user_type VARCHAR(6) NOT NULL CHECK(user_type in ('admin','user')) DEFAULT 'user'
);

CREATE TABLE tasks(
username VARCHAR(30) REFERENCES users(username),
task_id UUID PRIMARY KEY,
task_time TIME NOT NULL,
task_date DATE NOT NULL,
task VARCHAR(100) NOT NULL,
status VARCHAR(10) CHECK(status in ('incomplete','complete')) DEFAULT 'incomplete'
);

Create and user in users table with the username ='prateek' and user_type='admin' in database to access admin functionalities
