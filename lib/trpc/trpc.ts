import { getServerSession } from "next-auth";
import { authConfig } from "../authConfig";
import prisma from "../prisma";
import { initTRPC, TRPCError } from "@trpc/server";
import superJson from "superjson";
import { ZodError } from "zod";
import next from "next";

export const createTRPCContext = async () => {
  const session = await getServerSession(authConfig);

  let user = null;
  if (session?.user.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  }

  return {
    session,
    prisma,
    user,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superJson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
  }

  return next();
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

export const enforceUserIsAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
  }

  if (ctx.user.role !== "ADMIN") {
    throw new TRPCError({ code: "FORBIDDEN", message: "User is not admin" });
  }

  return next();
});

export const adminProcedure = t.procedure.use(enforceUserIsAdmin);
