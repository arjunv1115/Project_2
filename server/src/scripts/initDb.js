/**
 * Creates the database and tables from ../../../database/schema.sql.
 * Usage: npm run db:init   (reads credentials from server/.env)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.resolve(__dirname, '../../../database/schema.sql');

async function main() {
  const rawSql = await fs.readFile(schemaPath, 'utf8');

  // The schema file works on its own in phpMyAdmin / MySQL Workbench. Here the
  // database name comes from .env, so drop its CREATE DATABASE / USE lines.
  const tablesSql = rawSql
    .split('\n')
    .filter((line) => !/^\s*(CREATE DATABASE|USE)\b/i.test(line))
    .join('\n');

  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    multipleStatements: true,
  });

  try {
    const dbName = connection.escapeId(env.db.name);
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await connection.query(`USE ${dbName}`);
    await connection.query(tablesSql);
    console.log(`Database "${env.db.name}" is ready.`);
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(`Database setup failed: ${error.code || ''} ${error.message}`);
  process.exit(1);
});
