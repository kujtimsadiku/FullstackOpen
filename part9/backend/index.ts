import express from "express";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("Server is up").status(200);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running up on port ${PORT}`);
});
