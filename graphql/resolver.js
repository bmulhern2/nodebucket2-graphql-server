const bcrypt = require('bcryptjs');

const Task = require('../models/task');
const User = require('../models/user');

const graphqlResolver = {
    createTask: (args) => {
        return User.findOne({ "email": args['newTaskInput']['email'] }).then(user => {
            let tasks = user['tasks'];
            let newTask = new Task({ "task": args['newTaskInput']['task'] });
            tasks.push(newTask);
            user['tasks'] = tasks;
            newTask.save();
            user.save();
            console.log(user);
            return user;
        }).catch(err => {
            throw err;
        })
    },
    taskIDs: (args) => {
        return User.findOne({ "email": args['getTaskInput']['email'] }).then(user => {
            let taskIds = user['tasks'];
            return taskIds;
        }).catch(err => {
            throw err;
        });
    },
    // Get One Task Given Id
    task: (args) => {
        return Task.findOne({ '_id': args['taskInput']['_id'] }).then(taskFromDB => {
            return taskFromDB;
        })
    },
    editTask: (args) => {
        // Get A Task Given An taskId
        return Task.findOne({ "_id": args['singleTaskInput']['_id'] }).then(taskFromDB => {
            taskFromDB['task'] = args['singleTaskInput']['task'];
            taskFromDB.save();
            return taskFromDB; 
        });
    },
    deleteTask: (args) => {
        return Task.findOne({ "_id": args['deleteTaskInput']['_id'] }).then(taskFromDB => {
            taskFromDB.remove();
            return User.findOne({ "email": args['deleteTaskInput']['email'] }).then(userFromDB => {
                return userFromDB['tasks'].map((taskId, i) => {
                    if (taskId.toString() === args['deleteTaskInput']['_id']) {
                        userFromDB['tasks'].pop(taskId);
                        userFromDB.save();
                        return true;
                    } else {
                        return false;
                    }
                });
            });
        });
    },
    createUser: (args) => {
                return bcrypt.hash(args['userInput']['password'], 12).then(hash => {
                    let newUser = new User({
                        email: args['userInput']['email'],
                        password: hash,
                        tasks: []
                    });
                    newUser.save();
                    return newUser;
                }).catch(err => {
                    throw err;
                })
    },
    signIn: (args) => {
        return User.findOne({ "email": args['userInput']['email'] }).then(user => {
            return bcrypt.compare(args['userInput']['password'], user['password']).then(isLoggedIn => {
                    return { res: isLoggedIn };
            })
        });
    }
 };

module.exports = graphqlResolver;