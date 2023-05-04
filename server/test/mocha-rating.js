import axios from "axios";
import assert from "assert";
import { describe, it } from "mocha";

describe('Movie Rating System', () => {
    const url = 'http://localhost:3000';
    const instance = axios.create({
      baseURL: url,
      timeout: 3000,
      headers: {'content-type': 'application/json'}
    });
  
    const rate1 = {
        email: "prathams@gmail.com",
        movieId: "tt0000001",
        userRating: "7/10"
    }
    const rate2 = {
      email: "prathams@gmail.com",
      movieId: "tt0000003",
      userRating: "4/10"
    }
    const rate3 = {
      email: "prathams@gmail.com",
      movieId: "tt0000009",
      userRating: "8/10"
    }
  
    const data1 = {
      email: "prathams@gmail.com",
      movieId: "tt0000001",
      primaryTitle: "Carmencita",
      userRating: "",
      Status: "Completed",
    };
  
    const data2 = {
      email: "prathams@gmail.com",
      movieId: "tt0000003",
      primaryTitle: "Pauvre Pierrot",
      userRating: "",
      Status: "Dropped",
    }
  
    const data3 = {
      email: "prathams@gmail.com",
      movieId: "tt0000009",
      primaryTitle: "Miss Jerry",
      userRating: "",
      Status: "Watching",
    }
  
    describe('add_rating()', () => {
        it("should successfully add ratings", async () => {
            try {
                await instance.post('/watchlist', data1);
                await instance.post('/watchlist', data2);
                await instance.post('/watchlist', data3);
                let res1 = await instance.post(`/rating`,rate1);
                let res2 = await instance.post(`/rating`,rate2);
                let res3 = await instance.post(`/rating`,rate3);
                assert.strictEqual(res3.status, 200);
            } catch (err) {
              throw err;
            }
          });
  
      it('should gett all the ratings for a user', async () => {
        let res = await instance.get(`/rating/${data1.email}`);
        assert.strictEqual(res.status, 200);
        console.log(res.data);
        await instance.delete(`/watchlist/${data1.movieId}`);
        await instance.delete(`/watchlist/${data2.movieId}`);
        await instance.delete(`/watchlist/${data3.movieId}`);
      });
    });
  
    describe('getStats()', () => {
      it('should get rating stats successfully', async () => {
        const res1 = await instance.get(`/rating/stats/${data1.movieId}`);
        assert.strictEqual(res1.status, 200);
        console.log(res1.data);
      });
    });
  });