import { queries } from "../helper/schema";
import { ResolverFn } from "apollo-server-express";

export const useQuery = (prop: string | ResolverFn, fn?: ResolverFn) => {
    if (typeof prop === "string") {
        if (queries[prop])
            console.warn(
                `Query resolver (${prop}) with same name was found, it will be overwrited`
            );
        queries[prop] = fn;
    } else if (typeof prop === "function") {
        const { name } = prop;
        if (!name) throw new Error("useQuery: anonymus function");
        queries[name] = prop;
    } else throw new Error("useQuery: Unexpected parameter type");
};
