const { login } = require("../controllers/auth");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../models/user"); 
jest.mock("bcryptjs"); 
jest.mock("jsonwebtoken"); 

describe("Login Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { email: "test@example.com", password: "password123" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 401 if user is not found", async () => {
    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Email or password is wrong" });
  });

  it("should return 401 if password is incorrect", async () => {
    User.findOne.mockResolvedValue({ email: "test@example.com", password: "hashedpassword" });
    bcrypt.compare.mockResolvedValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Email or password is wrong" });
  });

  it("should return a token and user data on successful login", async () => {
    const mockUser = { _id: "123", email: "test@example.com", subscription: "starter", password: "hashedpassword" };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockedToken");
    User.findByIdAndUpdate.mockResolvedValue(mockUser);

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      token: "mockedToken",
      user: {
        email: mockUser.email,
        subscription: mockUser.subscription,
      },
    });
  });
});
