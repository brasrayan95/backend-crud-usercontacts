import "reflect-metadata";

import express, { Router } from "express";


const app = express();
app.use(express.json());


const port = 3002

app.get("/", (req, res) => {
    res.send(`Server running on port ${port}`)
})

export default app;
