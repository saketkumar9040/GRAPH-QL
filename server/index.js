import express from "express";
import { ApolloServer } from "@apollo/server";
import  bodyParser from "body-parser";
import cors from "cors";
import {expressMiddleware} from "@apollo/server/express4"

const startServer = async() => {
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
            type Todo{
                id: ID!
                title : String!
                completed : Boolean
            }
            type Query {
                getTodos : [Todo]
            }
        `,
        resolvers:{}
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphQl",expressMiddleware(server));

    app.listen(3000,()=>console.log("server started on PORT 8000..."))
};
startServer();