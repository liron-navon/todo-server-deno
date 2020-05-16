import { assertEquals } from "https://deno.land/std@0.50.0/testing/asserts.ts";
import {
  stub,
} from "https://raw.githubusercontent.com/udibo/mock/v0.3.0/stub.ts";
import { spy } from "https://raw.githubusercontent.com/udibo/mock/v0.3.0/spy.ts";
import { initDatabaseConnection, db, client } from "../../db/db.ts";
import { login, register, logout } from "./auth.ts";

const passwordPlain = "aabb11fdsfdsf@@";
const passwordHash =
  "$2a$08$54A3aIEm72fFFBYwlTZDeu/7kTVFxCi7PFIxaoV36E.zpc./uArS.";

const mockUser = () => ({
  password: passwordHash,
  email: "liron@test.com",
  _id: "d3e48b03-7baf-4d98-8df7-5002a8fae5e4",
});

const mockContext = () => ({
  throw: spy((code: number) => {
    throw new Error(`${code}`);
  }),
  cookies: {
    set: spy(() => {}),
    get: spy(() => {}),
  },
  response: {
    body: "",
  },
  state: {
    body: {},
  },
});

const mockDb = (collectionGen: () => any) => {
  const connectWithUriStub = stub(client, "connectWithUri", () => ({}));
  const collectionMocksStub = stub(db, "collection", collectionGen);
  initDatabaseConnection();

  return {
    restore: () => {
      connectWithUriStub.restore();
      collectionMocksStub.restore();
    },
  };
};

Deno.test("auth/login", async () => {
  const user = mockUser();
  const updateOnseSpy = spy(() => user);
  const mdb = mockDb(() => ({
    findOne: () => user,
    updateOne: updateOnseSpy,
  }));

  const context = mockContext();
  context.state.body = {
    password: passwordPlain,
    email: user.email,
  };

  await login(context as any);
  assertEquals(context.response.body, "OK");
  mdb.restore();
});

Deno.test("auth/register", async () => {
  const user = mockUser();
  const insertOneSpy = spy(() => user);
  const mdb = mockDb(() => ({
    insertOne: insertOneSpy,
    findOne: spy(() => null),
  }));

  const context = mockContext();
  context.state.body = {
    password: passwordPlain,
    email: user.email,
  };

  await register(context as any);
  assertEquals(context.response.body, "OK");
  mdb.restore();
});

Deno.test("auth/logout", async () => {
  const user = mockUser();
  const updateOnseSpy = spy(() => user);
  const mdb = mockDb(() => ({
    updateOne: updateOnseSpy,
  }));

  const context = mockContext();
  (context.state as any).user = user;

  await logout(context as any);
  assertEquals(context.response.body, "OK");
  mdb.restore();
});
