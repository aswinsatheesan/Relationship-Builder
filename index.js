const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json()); //allows us to access the req.body

// app.use(express.static(path.join(__dirname,"client/build")));
// app.use(express.static("client/build"));

if (process.env.NODE_ENV === "production") {
  //serve static content
  app.use(express.static(path.join(__dirname, "client/build")));
}

//Routes

//Add a name
app.post("/person", async (req, res) => {
  try {
    const { person } = req.body;
    const newName = await pool.query(
      "INSERT INTO people (name) VALUES($1) RETURNING *",
      [person]
    );
    res.json(newName.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all names
app.get("/person", async (req, res) => {
  try {
    const names = await pool.query("SELECT * FROM people order by pid");
    res.json(names.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a name
app.get("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const person = await pool.query("SELECT * FROM people WHERE pid = $1", [
      id,
    ]);
    res.json(person.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update name
app.put("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateName = await pool.query(
      "UPDATE people SET name = $1 WHERE pid = $2",
      [name, id]
    );
    res.json(updateName);
  } catch (error) {
    console.error(error.message);
  }
});

// Remove Name
app.delete("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("delete request");
    const deleteName = await pool.query("DELETE FROM people WHERE pid = $1", [
      id,
    ]);
    const number = await pool.query("SELECT MAX(pid) FROM people");
    let num = number.rows[0];
    num = num.max + 1;
    await pool.query(`ALTER SEQUENCE people_pid_seq RESTART WITH ${num}`);
    res.json(deleteName);
  } catch (error) {
    console.error(error.message);
  }
});

// Add one Relation
app.post("/relations", async (req, res) => {
  try {
    const { person1, person2, tag } = req.body;
    const number = await pool.query("SELECT MAX(rid) FROM relations");
    let num = number.rows[0];
    num = num.max + 1;
    await pool.query(`ALTER SEQUENCE relations_rid_seq RESTART WITH ${num}`);
    const newRel = await pool.query(
      "INSERT INTO relations (firstperson,secondperson,tag) VALUES($1,$2,$3) RETURNING *",
      [person1, person2, tag]
    );
    res.json(newRel.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all Relations
app.get("/relations", async (req, res) => {
  try {
    const allRel = await pool.query("SELECT * FROM relations order by rid");
    res.json(allRel.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a Relation
app.get("/relations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Rel = await pool.query(
      "SELECT * FROM relations WHERE relation_id = $1",
      [id]
    );
    res.json(Rel.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a Relation
app.put("/relations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tag } = req.body;

    const updateTag = await pool.query(
      "UPDATE relations SET tag = $1 WHERE rid=$2",
      [tag, id]
    );
    res.json(updateTag);
  } catch (error) {
    console.error(error.message);
  }
});

// Remove a Relation
app.delete("/relations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTag = await pool.query("DELETE FROM relations WHERE rid = $1", [
      id,
    ]);
    const number = await pool.query("SELECT MAX(rid) FROM relations");
    let num = number.rows[0];
    num = num.max + 1;
    await pool.query(`ALTER SEQUENCE relations_rid_seq RESTART WITH ${num}`);
    res.json(deleteTag);
  } catch (error) {
    console.error(error.message);
  }
});
// Add one Tag
app.post("/tags", async (req, res) => {
  try {
    const { tag } = req.body;
    const newTag = await pool.query(
      "INSERT INTO tags (tag) VALUES($1) RETURNING *",
      [tag]
    );
    res.json(newTag.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all Tags
app.get("/tags", async (req, res) => {
  try {
    const allTags = await pool.query("SELECT * FROM tags order by tid");
    res.json(allTags.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a Tag
app.get("/tags/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await pool.query("SELECT * FROM tags WHERE tid = $1", [id]);
    res.json(tag.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a Tag
app.put("/tags/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tag } = req.body;
    const updateTag = await pool.query(
      "UPDATE tags SET tag = $1 WHERE tid = $2",
      [tag, id]
    );
    res.json(updateTag);
  } catch (error) {
    console.error(error.message);
  }
});

// Remove a Tag
app.delete("/tags/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTag = await pool.query("DELETE FROM tags WHERE tid = $1", [id]);
    const number = await pool.query("SELECT MAX(tid) FROM tags");
    let num = number.rows[0];
    num = num.max + 1;
    await pool.query(`ALTER SEQUENCE tags_tid_seq RESTART WITH ${num}`);
    res.json(deleteTag);
  } catch (error) {
    console.error(error.message);
  }
});

//   app.get(`${process.env.API_DIR}/`, (req, res) => {
//     res.send("<center><span>Relationship Builder API Listening</span></center>");
//   });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
