import axios from "axios";
import assert from "assert";
import { describe, it } from "mocha";

describe("Authentication Tests", () => {
  var url = "http://localhost:3000";

  // Let's configure the base url
  const instance = axios.create({
    baseURL: url,
    timeout: 3000,
    headers: { "content-type": "application/json" },
  });

  var data = {
    email: "zkhalique@gmail.com",
    password: "123abc",
  };
  var err_data1 = {
    email: "error@gmail.com",
    password: "123abc"
  };
  var err_data2 = {
    email: "zkhalique@gmail.com",
    password: "error"
  };
  var userdata = {
    firstName: "Zaid",
    lastName: "Khalique",
    email: "zkhalique@gmail.com",
    password: "123abc",
    friends: [],
  };
  describe("User registration, login, logout and remove", () => {
    it("should successfully register a user", async () => {
      try {
        let res = await instance.post("/register", userdata);
        assert.strictEqual(res.status, 201);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, 'User registered successfully');
        console.log(res.data);
      } catch (err) {
        throw err;
      }
    });
    
    it("should return error if user exists", async () => {
      try {
        let res = await instance.post("/register", userdata);
        assert.strictEqual(res.status, 200);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, 'User already exists');
        console.log(res.data.message);
      } catch (err) {
        throw err;
      }
    });

    it("should successfully login a user", async () => {
      try {
        let res = await instance.post("/login", data);
        assert.strictEqual(res.status, 200);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, "Login Success!");
        console.log(res.data);
      } catch (err) {
        throw err;
      }
    });

    it("should return error if user does not exists", async () => {
      try {
        let res = await instance.post("/login", err_data1);
        assert.strictEqual(res.status, 201);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, 'User does not exist.');
        console.log(res.data);
      } catch (err) {
        throw err;
      }
    });

    it("should return error if password is incorrect", async () => {
      try {
        let res = await instance.post("/login", err_data2);
        assert.strictEqual(res.status, 202);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, 'Invalid credentials.');
        console.log(res.data);
      } catch (err) {
        throw err;
      }
    });

    it("should successfully logout a user", async () => {
      try {
        let res = await instance.post("/logout", data);
        assert.strictEqual(res.status, 200);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, "Logout successful");
        console.log(res.data.message);
      } catch (err) {
        throw err;
      }
    });

    it("should successfully delete a user", async () => {
      try {
        let res = await instance.delete(`/users/${userdata.email}`);
        assert.strictEqual(res.status, 200);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, "user deleted");
        console.log(res.data);
      } catch (err) {
        throw err;
      }
    });
  });
});