import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

app.get("/notes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY id DESC"
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Create Note
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );

    // success response
    //res.json(result.rows[0]);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
    
  }
});

// Update Note
app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const result = await pool.query(
      "UPDATE notes SET title=$1, content=$2, updated_at = CURRENT_TIMESTAMP WHERE id=$3 RETURNING *",
      [title, content, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete Note
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM notes WHERE id=$1",
      [id]
    );

    //res.json({ message: "Note deleted successfully" });
    return res.status(200).json({ message: "Note deleted successfully" });

  } catch (err) {
    console.error(err.message);
   // res.status(500).send("Server Error");
   return res.status(500).json({ error: "Server Error" });
  }
});


pool.query("SELECT NOW()")
  .then(res => console.log("DB Connected:", res.rows[0]))
  .catch(err => console.error("DB Connection Error:", err.message));

app.get("/test-db", async (req, res) => {
    try{
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Query Error:", err.message);
        res.status(500).send("Database connection failed");

    }
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });