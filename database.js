import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getPosts() {
  const [rows] = await pool.query("SELECT * FROM posts ORDER BY Date DESC")
  return rows;
}

export async function createPost(name, title, content) {
  const result = await pool.query(`INSERT INTO posts (Name, PostTopic, PostText)
    VALUES (?, ?, ?)`, [name, title, content])
  return result;
}
