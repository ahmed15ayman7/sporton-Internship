import { User } from "@sporton/interfaces";

declare module "next-auth" {
    interface Session {
        user: User;
        access_token: string;
        refresh_token: string;
    }
}