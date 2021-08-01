let { buildSchema } = require('graphql');

const graphqlSchema = buildSchema(`
    type TaskId {
        _id: String
    }

    type Auth {
        res: Boolean
    }

    type Task {
        _id: String!
        task: String!
    }

    type User {
        email: String!
        password: String!
        tasks: [Task!]!
    }

    input TaskInput {
        task: String!
    }
    
    input TaskIdInput {
        _id: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    input NewTaskInput {
        email: String!
        task: String!
    }

    input GetTaskInput {
        email: String!
    }

    input SingleTaskInput {
        email: String!
        _id: String!
        task: String!
    }

    input DeleteTaskInput {
        email: String!
        _id: String!
    }

    type RootQuery {
        taskIDs(getTaskInput: GetTaskInput): [TaskId!]!
        task(taskInput: TaskIdInput): Task!
    }

    type RootMutation {
        createTask(newTaskInput: NewTaskInput): User
        createUser(userInput: UserInput): User
        signIn(userInput: UserInput): Auth
        editTask(singleTaskInput: SingleTaskInput): Task
        deleteTask(deleteTaskInput: DeleteTaskInput): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = graphqlSchema;