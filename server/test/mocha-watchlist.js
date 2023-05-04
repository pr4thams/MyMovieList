import axios from "axios";
import assert from "assert";
import { describe, it } from "mocha";

describe("API tests", () => {
  var url = "http://localhost:3000";

  // Let's configure the base url
  const instance = axios.create({
    baseURL: url,
    timeout: 3000,
    headers: { "content-type": "application/json" },
  });

  var data = {
    email: "prathams@gmail.com",
    movieId: "tt0000001",
    primaryTitle: "Carmencita",
    userRating: "",
    Status: "Completed",
  };

  var errdata1 = {
    email: "prathams@gmail.com",
    movieId: "tt0000003",
    primaryTitle: "Pauvre Pierrot",
    userRating: "",
    Status: "Dropped",
  }

  describe("Watchlist operations", () => {
    it("should successfully add a movie to the watchlist", async () => {
      try {
        let res = await instance.post("/watchlist", data);
        assert.strictEqual(res.status, 201);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, "Item Added");
        console.log(res.data);
      } catch (err) {
        throw err;
      }
    });

    it("should throw error if a title added already exists", async () => {
      try {
        let res = await instance.post("/watchlist", data);
        assert.strictEqual(res.status, 200);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, 'Title already in watchlist');
        console.log(res.data.message);
      } catch (err) {
        throw err;
      }
    });

    it("should successfully get the watchlist for a user", async () => {
      try {
        let res = await instance.get(`/watchlist/${data.email}`);
        assert.strictEqual(res.status, 200);
        assert(typeof res.data === 'object');
        assert(Object.keys(res.data).length > 0);
        console.log(res.data);
      } catch (err) {
        throw err;
      }
    });

    
    it("should successfully delete a movie from the watchlist", async () => {
      try {
        let res = await instance.delete(`/watchlist/${data.movieId}`);
        assert.strictEqual(res.status, 200);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, "Movie Deleted!");
        console.log(res.data.message);
      } catch (err) {
        throw err;
      }
    });

    it("should throw error if title does not exist", async () => {
      try {
        let res = await instance.delete(`/watchlist/${data.movieId}`);
        assert.strictEqual(res.status, 201);
        assert(res.data.hasOwnProperty("message"));
        assert.strictEqual(res.data.message, "Title not found in watchlist");
        console.log(res.data.message);
      } catch (err) {
         throw err;
      }
    });
  });
});
