-- Create databases
CREATE DATABASE IF NOT EXISTS users_db;
CREATE DATABASE IF NOT EXISTS tasks_db;

-- Grant permissions
GRANT ALL PRIVILEGES ON users_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON tasks_db.* TO 'root'@'%';
FLUSH PRIVILEGES;