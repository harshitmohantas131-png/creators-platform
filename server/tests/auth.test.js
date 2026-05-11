import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import connectDB from "../config/database.js";
import User from "../models/User.js";

dotenv.config();

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await connectDB();
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Routes", () => {

  // ✅ REGISTER SUCCESS
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  // ❌ REGISTER EXISTING
  it("should fail if email exists", async () => {
    await User.create({
      name: "Test",
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).toBe(400);
  });

  // ❌ MISSING FIELDS
  it("should fail if missing fields", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
    });

    expect(res.status).toBe(400);
  });

  // ✅ LOGIN SUCCESS
  it("should login successfully", async () => {
    await User.create({
      name: "Test",
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  // ❌ WRONG PASSWORD
  it("should fail with wrong password", async () => {
    await User.create({
      name: "Test",
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpass",
    });

    expect(res.status).toBe(401);
  });

});