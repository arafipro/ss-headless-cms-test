import { getRequestContext } from "@cloudflare/next-on-pages";
import { PrismaD1 } from "@prisma/adapter-d1";
import { Prisma, PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const adapter = new PrismaD1(getRequestContext().env.DB);
const prisma = new PrismaClient({ adapter });

const Posts = Prisma.validator<Prisma.PostDefaultArgs>()({});
type Post = Prisma.PostGetPayload<typeof Posts>;

app.get("/", async (c) => {
  const posts = await prisma.post.findMany();
  return c.json(posts);
});

export const GET = handle(app);
