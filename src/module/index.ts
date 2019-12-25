import { makeExecutableSchema, SchemaDirectiveVisitor } from "graphql-tools";
import { gql } from "apollo-server-express";
import { queries, mutations } from "../lib/helper/schema";
import { userResolver } from "./user/user.resolver";
import { defaultFieldResolver } from "graphql";
import { verify } from "../lib/helper/jwt";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { useTypeDef } from "../lib/hook";

class UpperCaseDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = (...args: any[]) => {
            console.log("in auth directive");
            const context = args[2] as ExpressContext;
            // console.log(context.req);
            verify(context.req, context.res);
            return resolve.apply(this, args);
        };
        //   field.resolve = async function (...args) {
        //     const result = await resolve.apply(this, args);
        //     if (typeof result === "string") {
        //       return result.toUpperCase();
        //     }
        //     return result;
        //   };
    }
}

const rootTypeDef = gql`
    directive @Auth on FIELD_DEFINITION
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;

export function useSchema() {
    const typeDefs = useTypeDef(rootTypeDef);
    userResolver({});
    const resolvers: RootResolver = {
        Query: queries,
        Mutation: mutations
    };
    return makeExecutableSchema({
        typeDefs,
        resolvers,
        schemaDirectives: {
            Auth: UpperCaseDirective
        }
    });
}
