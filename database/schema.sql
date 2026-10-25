-- Smart Ideal Technologies - MySQL schema
-- Works with MySQL 8.x and MariaDB 10.5+.
-- Run it with:  npm run db:init   (from /server)   or import it in phpMyAdmin / Workbench.

CREATE DATABASE IF NOT EXISTS smart_ideal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smart_ideal_db;

CREATE TABLE IF NOT EXISTS contact_messages (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)    NOT NULL,
  email       VARCHAR(150)    NOT NULL,
  phone       VARCHAR(20)     NULL,
  subject     VARCHAR(150)    NOT NULL,
  message     TEXT            NOT NULL,
  status      ENUM('new', 'read', 'replied', 'spam') NOT NULL DEFAULT 'new',
  ip_address  VARCHAR(45)     NULL,
  user_agent  VARCHAR(255)    NULL,
  created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_status_created (status, created_at),
  KEY idx_contact_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Handy queries for the team:
--   SELECT id, name, email, subject, created_at FROM contact_messages WHERE status = 'new' ORDER BY created_at DESC;
--   UPDATE contact_messages SET status = 'replied' WHERE id = 1;
