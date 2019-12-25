import { Request } from "express";
import { User } from "./database/entity/User";
import { Repository, Connection } from "typeorm";
import { ResolverFn } from "apollo-server-express";

declare global {
    interface RootResolver {
        Query: Resolver;
        Mutation: Resolver;
        [key: string]: Resolver;
    }

    interface Resolver {
        [key: string]: ResolverFn;
    }

    interface FR<T = any> {
        (props: T): void;
    }

    interface Context {
        // verify: (req: Request) => Partial<User>;
        verify: () => Partial<User>;
    }
}
