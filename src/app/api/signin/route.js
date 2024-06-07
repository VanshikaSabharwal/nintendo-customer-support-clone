import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nintendo-customer-support",
  password: "nowpostdatabase",
  port: 5433,
});

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing email or password" }),
      { status: 400 }
    );
  }

  try {
    const result = await pool.query("SELECT * FROM signup WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "You have not registered" }),
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return new Response(
        JSON.stringify({ success: true, message: "Logged in successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid credentials" }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server Error" }),
      { status: 500 }
    );
  }
}
