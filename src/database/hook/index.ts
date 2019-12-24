import { getConnection, getCustomRepository, ObjectType } from "typeorm";

/**
 * Gives connection
 * @param connectioName Connection name
 */
export const useConnection = (connectioName = "default") => getConnection(connectioName);

/**
 * Gives custom repository by given entity class
 * @param customRepository Custom repository contructor
 * @param connectioName Connection name
 */
export const useRepository = <T>(customRepository: ObjectType<T>, connectioName = "default") =>
    getCustomRepository(customRepository, connectioName);
