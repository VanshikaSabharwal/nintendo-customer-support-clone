import { Pool } from "pg";

// Create a pool instance with your PostgreSQL connection details
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nintendo-customer-support",
  password: "nowpostdatabase",
  port: 5433,
});

// Named export for handling the POST request
export async function POST(req, res) {
  const { name, email, subject, message } = await req.json();

  try {
    const result = await pool.query(
      "INSERT INTO issues (name, email, subject, message, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, subject, message, new Date()]
    );

    return new Response(
      JSON.stringify({ success: true, data: result.rows[0] }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server Error" }),
      { status: 500 }
    );
  }
}

// Optionally, you can add named exports for other HTTP methods (GET, PUT, DELETE) if needed
export async function GET(req, res) {
  try {
    const result = await pool.query("SELECT * FROM issues");
    console.log(result);
    return new Response(JSON.stringify({ success: true, data: result.rows }), {
      status: 200,
    });
  } catch (error) {
    console.log("Database error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server Error" }),
      { status: 500 }
    );
  }
}
