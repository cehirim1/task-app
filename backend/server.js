import express from "express";
import { createUser, loginUser, getUsers } from "./Controller/user-auth-controller.js";
import {
  createTask,
  deleteTask,
  updateUserTask,
  getUserTasks,
} from "./Controller/task-conroller.js";

import { connection } from "./DB/db.js";
import cors from "cors";
import { authenticateToken } from "./JWT/JWT.js";



const app = express();
app.use(express.json());
app.use(cors());

const connect = connection();

//  CRUD -> POST, GET, PUT, DELETE
// JSON

app.get("/", authenticateToken, getUserTasks);

app.post("/create-task",  authenticateToken, createTask);
app.delete("/delete-task/:id", deleteTask);
app.put("/update-task/:id", updateUserTask);

app.post("/auth/signup", createUser);
app.post("/auth/login", loginUser);
app.get("/auth/getusers", getUsers);
const port = 5000
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});