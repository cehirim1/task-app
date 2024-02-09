import { User } from "../Model/user-model.js";
import { Task } from "../Model/tasks-model.js";

//create a new task

export const createTask = async (req, res) => {
  try {
    const { task, description, deadline, status, owner} = req.body;
    
    const findUser = await User.findById(owner);
    console.log(findUser)
    //verify user found or not
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //if user is found, create a task for that user
    const tasks = await Task.create({
      task,
      description,
      status,
      deadline, 
      owner
    });

    return res.status(201).json({ message: "New task created", tasks });
  } catch (error) {
    res.status(500).json({ error: "request not sent"});
   
  }

};

//get all tasks

export const getUserTasks = async (req, res) => {
  try {
    const { userID } = req;

    const findUser = await User.findById({ _id:userID});

    if (!findUser) {
      return res.status(400).json({ error: "No user with ID" });
    }

    //if user found, find task
    const findUserTask = await Task.find({ owner:userID });
    return res.status(200).json({ findUserTask });
  } catch (error) {
    res.status(500).json({ error: "request not sent" });
  }
};

//update userTask
export const updateUserTask = async (req, res) => {
  const { id } = req.params;
  const { task, deadline, description, status } = req.body;

  try {
    const findUserTask = await Task.findById({ _id: id });

    if (!findUserTask) {
      return res.status(400).json({ message: "No user found" });
    }

    const findTask = await Task.findOneAndUpdate(
      { _id:id },
      { task, deadline, description, status }
    );
    return res
      .status(200)
      .json({ message: "Task updated successfully", task,description,deadline,status, id });
  } catch (error) {
    res.status(500).json({ error: "request not sent" });
  }
};

//delete a task using task id not user id
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const findTask = await Task.findByIdAndDelete(id);

    if(!findTask) {
      return res.status(404).json({message:'User is invalid'})
    }

    return res.status(200).json({ message: "Task deleted successfully", id });
  } catch (error) {
    res.status(500).json({ error: "request not sent" });
  }
};
