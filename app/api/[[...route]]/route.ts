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

app
  .get("/", async (c) => {
    const posts = await prisma.post.findMany();
    return c.json(posts);
  })
  .post("/", async (c) => {
    try {
      const { title, content } = await c.req.json<Post>();
      await prisma.post.create({ data: { title, content } });
      return c.json({ message: "success" }, 201);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  });

export const GET = handle(app);
export const POST = handle(app);
