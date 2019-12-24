import { UserRepository } from "./user.repository";
import { Unauthorized } from "../../lib/http-status";
import { sign } from "../../lib/helper/jwt";
import { useRepository } from "../../database/hook";
import { useTypeDef } from "../../lib/hook";
import { userTypeDef } from "./user.typedef";

export const userResolver: MR = () => {
    const userRepository = useRepository(UserRepository);

    useTypeDef(userTypeDef);

    return {
        login: async (obj: { email: string; password: string }) => {
            const user = await userRepository.findOne({ email: obj.email });
            if (!user) throw new Unauthorized(); // NotFound 404

            const isValid = user.compare(obj.password);
            if (!isValid) throw new Unauthorized();

            return { token: sign(user.getToToken()) };
        },

        user: async (_, args: { id: number }) => {
            // console.log("CONTEXT", ctx);
            // ctx.verify();
            const user = await userRepository.findOne(args.id);
            if (!user) throw new Error("User not found");

            return user;
        },

        users: async (obj: { page?: number; limit?: number; filter?: string }) => {
            const { page = 1, limit = 10, filter = "" } = obj;
            const users = await userRepository.findUsers(limit, page, filter);
            return { users: users[0], count: users[1] };
        }
    };
};
