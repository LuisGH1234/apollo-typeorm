import { ResolverFn } from "apollo-server-express";
import { mutations } from "../helper/schema";

export const useMutation = (prop: string | ResolverFn, fn?: ResolverFn) => {
    if (typeof prop === "string") {
        if (mutations[prop])
            console.warn(
                `Mutation resolver (${prop}) with same name was found, it will be overwrited`
            );
        mutations[prop] = fn;
    } else if (typeof prop === "function") {
        const { name } = prop;
        if (!name) throw new Error("useMutation: anonymus function");
        mutations[name] = prop;
    } else throw new Error("useMutation: Unexpected parameter type");
};
