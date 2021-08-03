const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');

const app = express();

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("MongoDB Connected!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}));

app.listen(process.env.PORT || 8080, () => {
    console.log("Server Started On Port 8080!");
});
