import { pool } from '../config/db.js';

/**
 * Stores a message sent through the website contact form.
 * Uses a prepared statement, so user input is never concatenated into SQL.
 *
 * @returns {Promise<number>} the id of the new row
 */
export async function createContactMessage({
  name,
  email,
  phone,
  subject,
  message,
  ipAddress,
  userAgent,
}) {
  const [result] = await pool.execute(
    `INSERT INTO contact_messages
       (name, email, phone, subject, message, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      phone || null,
      subject,
      message,
      ipAddress || null,
      userAgent ? userAgent.slice(0, 255) : null,
    ],
  );

  return result.insertId;
}
