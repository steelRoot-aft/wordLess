import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/lib/trpc/routers/_app";
import { createTRPCContext } from "@/lib/trpc/trpc";
import path from "path";
import { error } from "console";

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext(),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) =>
            console.error(`❌ tRPC failed on ${path}: ${error.message}`)
        : undefined,
  });
};

export { handler as GET, handler as POST };