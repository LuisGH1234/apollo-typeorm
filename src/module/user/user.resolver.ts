import { UserRepository } from "./user.repository";
import { Unauthorized } from "../../lib/http-status";
import { sign } from "../../lib/helper/jwt";
import { useRepository } from "../../database/hook";
import { useTypeDef, useQuery, useMutation } from "../../lib/hook";
import { User } from "../../database/entity/User";

export const userResolver: FR = () => {
    const userRepository = useRepository(UserRepository);

    // useTypeDef(userTypeDef);
    useTypeDef(tool => tool.import(__dirname, "./schema.graphql"));

    useQuery(async function login(_, args: { email: string; password: string }) {
        const user = await userRepository.findOne({ email: args.email });
        if (!user) throw new Unauthorized();

        const isValid = user.compare(args.password);
        if (!isValid) throw new Unauthorized();

        return { token: sign(user.getToToken()) };
    });
    useQuery(async function user(_, args: { id: number }) {
        const user = await userRepository.findOne(args.id);
        if (!user) throw new Error("User not found");

        return user;
    });
    useQuery(async function users(_, args: { page?: number; limit?: number; filter?: string }) {
        const { page = 1, limit = 10, filter = "" } = args;
        const users = await userRepository.findUsers(limit, page, filter);
        return { users: users[0], count: users[1] };
    });

    useMutation(async function register(_, args: { user: User }) {
        const user = userRepository.create(args.user);
        await userRepository.save(user);
        // console.log(user);
        return { token: sign(user.getToToken()) };
    });
};
