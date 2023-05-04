import axios from "axios";
import assert from "assert";
import { describe, it } from "mocha";

describe("Search Tests", () => {
    const myurl = 'http://localhost:3000';

    const instance = axios.create({
        baseURL: myurl,
        timeout: 100000,
        headers: { 'content-type': 'application/json' },
    });

    const data = {
        primaryTitle: 'Répétition dans un cirque',
    };
    const recent_data = {
        email: "bganesh@mun.ca",
    };
    const errordata = {
        primaryTitle: "Error Title"
    }
    

    describe('Search API tests', () => {
        it('should return an object with search results', async () => {
        try {
            const res = await instance.get(`/search/${data.primaryTitle}/${recent_data.email}`);
            assert.strictEqual(res.status, 200);
            assert.strictEqual(typeof res.data, 'object');
            console.log(res.data)
        } catch (err) {
            throw err;
        }
  });

        it('should return all the titles matching primaryTitle', async () => {
            try {
                const res = await instance.get(`/search/${data.primaryTitle}`);
                assert.strictEqual(res.status, 200);
                assert(typeof res.data === 'object');
                assert(Object.keys(res.data).length > 0);
                console.log(res.data);
            } catch (err) {
                throw err;
            }
        });

        it('should return error if no title matches', async () => {
            try {
                const res = await instance.get(`/search/${errordata.primaryTitle}`);
                assert.strictEqual(res.status, 201);
                assert(res.data.hasOwnProperty("message"));
                assert.strictEqual(res.data.message, 'Title not found');
                console.log(res.data.message);
            } catch (err) {
                throw err;
            }
        });
    });
});
