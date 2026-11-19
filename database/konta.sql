---konta aplikacji, admina , report

--(localhost)

CREATE USER 'taskboard_app'@'localhost' IDENTIFIED BY 'TASKboard_aplikacia$';
DROP USER IF EXISTS 'taskboard_app'@'localhost';
GRANT SELECT, INSERT, UPDATE ON taskboard.* TO 'taskboard_app'@"localhost";

CREATE USER 'taskboard_admin'@'localhost' IDENTIFIED BY 'TASKboard_admin$';
DROP USER IF EXISTS 'taskboard_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON taskboard.* TO 'taskboard_admin'@'localhost';

CREATE USER 'taskboard_report'@'localhost' IDENTIFIED BY 'TASKboard_report$';
DROP USER IF EXISTS 'taskboard_report'@'localhost';
GRANT SELECT ON taskboard.* TO 'taskboard_report'@"localhost";

--(127.0.0.1)

CREATE USER 'taskboard_app'@'127.0.0.1' IDENTIFIED BY 'TASKboard_aplikacia$';
DROP USER IF EXISTS 'taskboard_app'@'127.0.0.1';
GRANT SELECT, INSERT, UPDATE ON taskboard.* TO 'taskboard_app'@"127.0.0.1";

CREATE USER 'taskboard_admin'@'127.0.0.1' IDENTIFIED BY 'TASKboard_admin$';
DROP USER IF EXISTS 'taskboard_admin'@'127.0.0.1';
GRANT SELECT, INSERT, UPDATE, DELETE ON taskboard.* TO 'taskboard_admin'@"127.0.0.1";

CREATE USER 'taskboard_report'@'127.0.0.1' IDENTIFIED BY 'TASKboard_report$';
DROP USER IF EXISTS 'taskboard_report'@'127.0.0.1';
GRANT SELECT ON taskboard.* TO 'taskboard_report'@"127.0.0.1";

FLUSH PRIVILEGES;