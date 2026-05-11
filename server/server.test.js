import app from "./server.js";

describe("Server App", () => {
  test("should export the app", () => {
    expect(app).toBeDefined();
    expect(typeof app).toBe("function");
  });
});
