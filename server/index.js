import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
            type Users {
                id: ID!
                name: String
                email : String
                phone: Int,
                website: String,
            }
            type Todo {
                id: ID!
                title : String!
                completed : Boolean
            }
            type Query {
                getTodos : [Todo]
            }
        `,
    resolvers: {
      Query: {
        getTodos: async() => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
      }
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(3000, () => console.log("server started on PORT 3000..."));
};
startServer();
