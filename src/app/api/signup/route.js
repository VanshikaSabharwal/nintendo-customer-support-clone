import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nintendo-customer-support",
  password: "nowpostdatabase",
  port: 5433,
});

export async function POST(req, res) {
  const { name, email, password } = await req.json();
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO signup (name,email,password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    return new Response(
      JSON.stringify({
        success: true,
        data: result.rows[0],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Database error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Server Error",
      }),
      { status: 500 }
    );
  }
}
