import { DocumentNode } from "graphql";
import { typeDefs } from "../helper/schema";

export const useTypeDef = <T = DocumentNode>(
    document: DocumentNode,
    cb?: (document: DocumentNode, typeDefs: DocumentNode[]) => T
) => {
    typeDefs.push(document);
    if (cb) return cb(document, typeDefs) as T;
    return document;
};
