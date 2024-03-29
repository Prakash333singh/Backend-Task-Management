const express = require("express");
const taskController = require("../controllers/taskController");
const {authValidation} = require("../middlewares/authValidation");

taskRouter = express.Router();

taskRouter.post("/create", authValidation, taskController.createTask); 
taskRouter.get("/allTasks", authValidation, taskController.fetchAllTasks);
taskRouter.get("/allUserTasks", authValidation, taskController.fetchUserTasks);

taskRouter.get("/completed", authValidation, taskController.allCompletedTasks); 
taskRouter.get("/uncompleted", authValidation, taskController.allUncompletedTasks); 

taskRouter.get("/userCompleted", authValidation, taskController.userCompletedTasks); 
taskRouter.get("/userUncompleted", authValidation, taskController.userUncompletedTasks); 

taskRouter.get("/:id", authValidation, taskController.fetchSingleTask); 
taskRouter.patch("/:id", authValidation, taskController.updateTaskDetails); 
taskRouter.delete("/:id", authValidation, taskController.deleteTask); 

taskRouter.post("/:id/complete", authValidation, taskController.completeTask); 
taskRouter.post("/:id/uncomplete", authValidation, taskController.uncompleteTask); 


module.exports = taskRouter;