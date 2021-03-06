import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { useSchema } from "./module";
import * as express from "express";

async function init() {
    try {
        await createConnection();
        const schema = useSchema();
        const server = new ApolloServer({ schema, context: req => req });
        const app = express();
        server.applyMiddleware({ app });
        app.set("PORT", process.env.PORT || 3001);

        app.listen(app.get("PORT"), err => {
            if (err) return console.error("Error: " + err);
            console.log(`Running a GraphQL API server at localhost:${app.get("PORT")}/graphql`);
        });
    } catch (error) {
        console.error(error);
    }
}
init();
