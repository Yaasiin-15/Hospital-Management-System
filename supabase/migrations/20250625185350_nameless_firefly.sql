/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (varchar, primary key)
      - `username` (varchar, unique)
      - `email` (varchar, unique)
      - `password` (varchar)
      - `role` (varchar)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Unique constraints on email and username
*/

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);