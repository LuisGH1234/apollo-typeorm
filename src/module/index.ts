import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server-express";
import { userResolver } from "./user/user.resolver";
import { typeDefs } from "../lib/helper/schema";

const books = [
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling"
    },
    {
        title: "Jurassic Park",
        author: "Michael Crichton"
    }
];

const typeDefs2 = gql`
    type Author {
        books: [Book]
    }
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }

    type Mutation {
        register(user: UserInput!): AuthResult!
    }
`;
typeDefs.push(typeDefs2);
export function makeSchema() {
    const resolvers: RootResolver = {
        // UserModule: ,
        Query: {
            books: () => books,
            ...userResolver({})
        },
        Author: {
            books: () => books
        }
    };
    return makeExecutableSchema({ typeDefs, resolvers });
}
