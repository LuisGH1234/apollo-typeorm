import { gql } from "apollo-server-express";

export const userTypeDef = gql`
    extend type Query {
        user(id: ID!): User!
        users(page: Int, limit: Int, filter: String): UserPaginationResult!
        login(email: String!, password: String!): AuthResult!
    }
    type AuthResult {
        token: String!
    }

    type UserPaginationResult {
        users: [User!]!
        count: Int
    }

    type User {
        id: ID!
        firstName: String
        lastName: String
        age: Int
        nickname: String
        email: String
        password: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        age: Int!
        nickname: String
        email: String!
        password: String!
    }
`;
