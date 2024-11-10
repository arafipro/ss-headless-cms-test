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
    try {
      const posts = await prisma.post.findMany();
      return c.json(posts);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .post("/", async (c) => {
    try {
      const { title, content } = await c.req.json<Post>();
      await prisma.post.create({ data: { title, content } });
      return c.json({ message: "success" }, 201);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    try {
      const posts = await prisma.post.findFirst({
        where: { id },
      });
      return c.json(posts);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .put("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const { title, content } = await c.req.json<Post>();
    try {
      await prisma.post.update({
        where: { id },
        data: { title, content },
      });
      return c.json({ message: "success" }, 200);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  })
  .delete("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    try {
      await prisma.post.delete({
        where: { id },
      });
      return c.json({ message: "success" }, 200);
    } catch (e) {
      return c.json({ error: e }, 500);
    }
  });

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
