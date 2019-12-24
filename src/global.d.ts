import { Request } from "express";
import { User } from "./database/entity/User";
import { Repository, Connection } from "typeorm";
import { ResolverFn } from "apollo-server-express";

declare global {
    interface RootResolver {
        [key: string]: Resolver;
    }

    interface Resolver {
        [key: string]: ResolverFn;
    }

    interface MR<T = any> {
        (props: T): Resolver;
    }

    interface Context {
        // verify: (req: Request) => Partial<User>;
        verify: () => Partial<User>;
    }
}
