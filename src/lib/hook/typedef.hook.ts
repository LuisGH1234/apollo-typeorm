import { DocumentNode } from "graphql";
import { typeDefs } from "../helper/schema";
import { gql } from "apollo-server-express";
import * as fs from "fs";
import * as path from "path";

interface ITool {
    import: (...paths: string[]) => string;
}

export type DocumentTool = (tools: ITool) => string;

const tool: ITool = {
    import: (...paths: string[]) => {
        const file = fs.readFileSync(path.join(...paths));
        return file.toString();
    }
};

export const useTypeDef = <T = DocumentNode[]>(
    document: DocumentNode | DocumentTool,
    cb?: (document: DocumentNode, typeDefs: DocumentNode[]) => T
) => {
    if (typeof document === "object") {
        typeDefs.push(document);
        if (cb) return cb(document, typeDefs) as T;
        return typeDefs;
    } else if (typeof document === "function") {
        const result = document(tool);
        const doc = gql(result);
        typeDefs.push(doc);
        if (cb) return cb(doc, typeDefs) as T;
        return typeDefs;
    } else throw new Error("useTypeDef: Unexpected parameter type");
};
