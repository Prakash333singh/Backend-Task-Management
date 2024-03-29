const Task = require("../models/tasks");
const User = require("../models/user");

const createTask = async(req,res) => {
    const user = await User.findOne({ _id: req.user._id });

    const task = new Task({
        createdBy : user._id,
        title : req.body.title,
        desc : req.body.desc,
        createdAt : new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'}),
        updatedAt : "",
        completedAt: "",
        completionStatus: false
    });

    try{
        const newTask = await task.save();
        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully created a task",
            "data": [newTask]
        });
    } 
    catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};

const fetchAllTasks = async(req,res) => {
    try {
        const tasks = await Task.find();
        return res.status(201).send({
            "success": true,
            "error_code": null,
            "message": "Successfully fetched all tasks",
            "data": tasks
        });
    } catch (err) {
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};

const fetchUserTasks = async(req,res) => {
    const user = await User.findOne({_id: req.user._id});

    try {
        const tasks = await Task.find();

        const userTasks = tasks.filter(function(task){
            if(task.createdBy.toString() === user._id.toString())
                return task;
        });

        return res.status(201).send({
            "success": true,
            "error_code": null,
            "message": "Successfully fetched all tasks",
            "data": userTasks
        });
        
    } catch (err) {
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const fetchSingleTask = async(req,res) => {
    try {
        let id = req.params.id;
        const task = await Task.findById(id);

        if(!task){
            return res.send({
            "success": false,
            "error_code": 404,
            "message": "Task does not exist",
            "data": []
            });
        }
            
        return res.status(201).send({
            "success": true,
            "error_code": null,
            "message": "Successfully fetched the task",
            "data": [task]
        });
    } catch (err) {
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};

const updateTaskDetails = async(req,res) => {
    const user = await User.findOne({_id: req.user._id});

    try {
        let id = req.params.id;
        const task = await Task.findById(id);

        if(!task){
            return res.send({
            "success": false,
            "error_code": 404,
            "message": "Task does not exist",
            "data": []
            });
        }

        if(task.createdBy.toString() !== user._id.toString()){
            return res.send({
                "success" : false,
                "error_code": 404,
                "message": "You are not assigned this task, So cannot update it",
                "data": []
            });
        }

        if(task.completionStatus){
            return res.send({
            "success": false,
            "error_code": 400,
            "message": "Completed task cannot be updated",
            "data": [task]
            });
        }

        task.title = req.body.title;
        task.desc = req.body.desc;
        task.updatedAt = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});

        await task.save();
        const updatedTask = ({
            title: task.title,
            desc: task.desc,
            updatedAt: task.updatedAt
        });

        return res.status(201).send({
            "success": true,
            "error_code": null,
            "message": "Successfully updated the task",
            "data": [updatedTask]
        });
    } catch (err) {
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};

const deleteTask = async(req,res) => {
    const user = await User.findOne({ _id: req.user._id });

    try{
        let id = req.params.id;
        const task = await Task.findById(id);

        if(!task){
            return res.send({
                "success" : false,
                "error_code": 404,
                "message": "Task does not exist",
                "data": []
            });
        }

        // console.log(task.createdBy);
        // console.log(user._id);

        if(task.createdBy.toString() !== user._id.toString()){
            return res.send({
                "success" : false,
                "error_code": 404,
                "message": "You are not assigned this task, So cannot delete it",
                "data": []
            });
        }

        await task.deleteOne();
        return res.send({
            "success" : true,
            "error_code": null,
            "message": "Successfully deleted the task",
            "data": []
        });

    } catch(err){
        return res.send({
            "success" : false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};

const completeTask = async(req,res) => {
    const user = await User.findOne({ _id: req.user._id});

    try{
        let id = req.params.id;
        const task = await Task.findById(id);

        if(!task){
            return res.send({
                "success" : false,
                "error_code": 404,
                "message": "Task does not exist",
                "data": []
            });
        }

        if(task.createdBy.toString() !== user._id.toString()){
            return res.send({
                "success" : false,
                "error_code": 404,
                "message": "You are not assigned this task, So cannot complete it",
                "data": []
            });
        }

        if(task.completionStatus){
            return res.send({
                "success" : false,
                "error_code": 400,
                "message": "Task already completed",
                "data": [task]
            });
        }

        task.completedAt = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
        task.completionStatus = true;

        await task.save();

        const completedTask = ({
            title: task.title,
            desc: task.desc,
            completedAt: task.completedAt,
            completionStatus: task.completionStatus
        });

        return res.send({
            "success" : true,
            "error_code": null,
            "message": "Successfully completed the task",
            "data": [completedTask]
        });
    } catch(err){
        return res.send({
            "success" : false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const uncompleteTask = async(req,res) => {
    const user = await User.findOne({ _id: req.user._id});

    try{
        let id = req.params.id;
        const task = await Task.findById(id);

        if(!task){
            return res.send({
                "success" : false,
                "error_code": 404,
                "message": "Task does not exist",
                "data": []
            });
        }

        if(task.createdBy.toString() !== user._id.toString()){
            return res.send({
                "success" : false,
                "error_code": 404,
                "message": "You are not assigned this task, So cannot uncomplete it",
                "data": []
            });
        }

        if(!task.completionStatus){
            return res.send({
                "success" : false,
                "error_code": 400,
                "message": "Task already UnComplete",
                "data": [task]
            });
        }

        task.completedAt = "";
        task.updatedAt = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
        task.completionStatus = false;

        await task.save();

        const uncompletedTask = ({
            title: task.title,
            desc: task.desc,
            completedAt: task.completedAt,
            completionStatus: task.completionStatus
        });

        return res.send({
            "success" : true,
            "error_code": null,
            "message": "Successfully UnCompleted the task",
            "data": [uncompletedTask]
        });
    } catch(err){
        return res.send({
            "success" : false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const allCompletedTasks = async(req,res) => {

    try {
        
        const tasks = await Task.find();

        const completedTasks = tasks.filter(function(task){
            if(task.completionStatus === true)
                return task;
        });

        return res.send({
            "success" : true,
            "error_code": null,
            "message": "Successfully fetched all Completed tasks",
            "data": completedTasks
        });

    } catch (err) {
        return res.send({
            "success" : false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const allUncompletedTasks = async(req,res) => {
    
    try {
        const tasks = await Task.find();

        const uncompletedTasks = tasks.filter(function(task){
            if(task.completionStatus === false)
                return task;
        });

        return res.send({
            "success" : true,
            "error_code": null,
            "message": "Successfully fetched all UnCompleted tasks",
            "data": uncompletedTasks
        });

    } catch (err) {
        return res.send({
            "success" : false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const userCompletedTasks = async(req,res) => {

    const user = await User.findOne({ _id: req.user._id});
    
    try {
        const tasks = await Task.find();

        const completedTasks = tasks.filter(function(task){
            if((user._id.toString() === task.createdBy.toString()) && (task.completionStatus === true))
                return task;
        });

        return res.send({
            "success" : true,
            "error_code": null,
            "message": "Successfully fetched all Completed tasks of a user",
            "data": completedTasks
        });

    } catch (err) {
        return res.send({
            "success" : false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const userUncompletedTasks = async(req,res) => {

    const user = await User.findOne({ _id: req.user._id});
    
    try {
        const tasks = await Task.find();

        const uncompletedTasks = tasks.filter(function(task){
            if((user._id.toString() === task.createdBy.toString()) && (task.completionStatus === false))
                return task;
        });

        return res.send({
            "success" : true,
            "error_code": null,
            "message": "Successfully fetched all unCompleted tasks of a user",
            "data": uncompletedTasks
        });

    } catch (err) {
        return res.send({
            "success" : false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


module.exports = {
    createTask,
    fetchAllTasks,
    fetchUserTasks,
    fetchSingleTask,
    updateTaskDetails,
    deleteTask,
    completeTask,
    uncompleteTask,
    allCompletedTasks,
    allUncompletedTasks,
    userCompletedTasks,
    userUncompletedTasks
};