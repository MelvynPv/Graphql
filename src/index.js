require('dotenv').config();
const {GraphQLServer} = require('graphql-yoga');
const {importSchema} = require('graphql-import');

const typeDefs = importSchema('./src/schema.graphql');
const {makeExecutableSchema} = require('graphql-tools');
const mongoose = require('mongoose');

const {AuthDirective} = require('../src/resolvers/directive');

const Usuario = require('./models/Usuarios');
const { saludo,  getUsuario, getAllEmpresa,getEmpresa,getAllUsuarios} = require("./resolvers/Querys");
const { createUsuario,createEmpresa ,login,addPhoto} = require("./resolvers/Mutations");
const VerificaToken= require('../src/utils/verifyToken');

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
        getUsuario,
        getAllEmpresa,
        getEmpresa,
        getAllUsuarios
    },
    Mutation:{
        createUsuario,
        createEmpresa,
        login,
        addPhoto
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    scehmaDirectives:{
        auth: AuthDirective
    }
})

const server = new GraphQLServer({schema,context: async({request}) => VerificaToken(request)})
server.start(() => console.log('Server is running on localhost:4000'))