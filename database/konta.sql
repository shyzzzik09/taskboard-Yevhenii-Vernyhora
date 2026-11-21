-- Konta aplikacji, administratora i raportowania

-- localhost

DROP USER IF EXISTS 'taskboard_app'@'localhost';
CREATE USER 'taskboard_app'@'localhost' IDENTIFIED BY 'TASKboard_aplikacja$';
GRANT SELECT, INSERT, UPDATE ON taskboard.* TO 'taskboard_app'@'localhost';

DROP USER IF EXISTS 'taskboard_admin'@'localhost';
CREATE USER 'taskboard_admin'@'localhost' IDENTIFIED BY 'TASKboard_admin$';
GRANT SELECT, INSERT, UPDATE, DELETE ON taskboard.* TO 'taskboard_admin'@'localhost';

DROP USER IF EXISTS 'taskboard_report'@'localhost';
CREATE USER 'taskboard_report'@'localhost' IDENTIFIED BY 'TASKboard_report$';
GRANT SELECT ON taskboard.* TO 'taskboard_report'@'localhost';

-- 127.0.0.1

DROP USER IF EXISTS 'taskboard_app'@'127.0.0.1';
CREATE USER 'taskboard_app'@'127.0.0.1' IDENTIFIED BY 'TASKboard_aplikacja$';
GRANT SELECT, INSERT, UPDATE ON taskboard.* TO 'taskboard_app'@'127.0.0.1';

DROP USER IF EXISTS 'taskboard_admin'@'127.0.0.1';
CREATE USER 'taskboard_admin'@'127.0.0.1' IDENTIFIED BY 'TASKboard_admin$';
GRANT SELECT, INSERT, UPDATE, DELETE ON taskboard.* TO 'taskboard_admin'@'127.0.0.1';

DROP USER IF EXISTS 'taskboard_report'@'127.0.0.1';
CREATE USER 'taskboard_report'@'127.0.0.1' IDENTIFIED BY 'TASKboard_report$';
GRANT SELECT ON taskboard.* TO 'taskboard_report'@'127.0.0.1';

FLUSH PRIVILEGES;