import { Connection } from "typeorm";

export class DataBase {
    private _connection: Connection;

    public get connetion() {
        return this._connection;
    }

    public set connection(value: Connection) {
        if (!value) throw new Error("Database conection is undefined");
        this._connection = value;
    }
}

const database = new DataBase();
export default database;
