import { describe } from "node:test";
import request from "supertest";
import app from "../app.js";
import { NoteModel } from "../model/note.js";
import { connect, disconnect } from "./db.js";

let authToken;
let currentNoteId;

beforeAll(async () => {
  connect();
  await NoteModel.deleteMany({});

  const res = await request(app).post("/api/users/login").send({
    username: "testuser",
    password: "testpassword",
  });

  authToken = res.body.token;
});

afterAll(async () => {
  disconnect();
});

describe("GET /notes", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/api/notes");
    expect(res.statusCode).toEqual(200);
  });
});

describe("POST /notes", () => {
  it("should create a new note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "test note title",
        content: "test content title",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");

    currentNoteId = res.body._id;
  });
});

describe("GET /notes/:id", () => {
  it("should return a single note", async () => {
    const res = await request(app).get(`/api/notes/${currentNoteId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body);
    expect(res.body).toHaveProperty("_id", currentNoteId);
  });
});

describe("PATCH /notes/:id", () => {
  it("should update a single note", async () => {
    const oldres = await request(app)
      .patch(`/api/notes/${currentNoteId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "updated title",
        content: "updated content",
      });

    const res = await request(app).get(`/api/notes/${currentNoteId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body);
    expect(res.body).toHaveProperty("_id", currentNoteId);
    expect(res.body).toHaveProperty("title", "updated title");
    expect(res.body).toHaveProperty("content", "updated content");
    expect(oldres.body.updatedAt).not.toEqual(res.body.updatedAt);
  });
});

describe("DELETE /notes/:id", () => {
  it("should delete a single note", async () => {
    await request(app)
      .delete("/api/notes/" + currentNoteId)
      .set("Authorization", `Bearer ${authToken}`);
    const res = await request(app).get(`/api/notes/${currentNoteId}`);
    expect(res.statusCode).toEqual(404);
  });
});
