import { describe } from "node:test";
import request from "supertest";
import app from "../app.js";
import { UserModel } from "../model/user.js";
import { connect, disconnect } from "./db.js";

let authToken;

const dummyUser = {
  username: "dummyuser",
  password: "dummypassword",
};

beforeAll(async () => {
  connect();

  const res = await request(app).post("/api/users/login").send({
    username: "testuser",
    password: "testpassword",
  });

  authToken = res.body.token;
});

afterAll(async () => {
  await UserModel.deleteMany({
    username: {
      $ne: "testuser",
    },
  });
  disconnect();
});

describe("Registeration", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        ...dummyUser,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user", dummyUser.username);
  });

  it("user should be unique", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        ...dummyUser,
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("message", "Error creating new user");
  });
});

describe("login", () => {
  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        ...dummyUser,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
