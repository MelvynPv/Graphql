require('dotenv').config();
const {GraphQLServer} = require('graphql-yoga');
const {importSchema} = require('graphql-import');

const typeDefs = importSchema('./src/schema.graphql');

const mongoose = require('mongoose');


const Usuario = require('./models/Usuarios');
const { saludo,  getUsuario } = require("./resolvers/Querys");
const { createUsuario,createEmpresa } = require("./resolvers/Mutations");


mongoose.connect(process.env.mongoUrl,{useNewUrlParser: true},(err) => {
    if(!err){
        console.log("Mongoose conectado");
    }else
    {
        console.log("Mongoose Error!! not conected");
    }
});

const resolvers = {
    Query:{
        saludo,
        getUsuario
    },
    Mutation:{
        createUsuario,
        createEmpresa
    }
}


const server = new GraphQLServer({typeDefs,resolvers})
server.start(() => console.log('Server is running on localhost:4000'))