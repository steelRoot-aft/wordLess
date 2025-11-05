import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "./routers/_app";

export const api = createTRPCReact<AppRouter>();
