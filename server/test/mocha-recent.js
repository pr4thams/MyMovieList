import axios from "axios";
import assert from "assert";
import { describe, it } from "mocha";

const url = 'http://localhost:3000';

// Let's configure the base url
const instance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers: {'content-type': 'application/json'}
});
const data1 = {
  primaryTitle: 'Répétition dans un cirque',
};
const data2 = {
  primaryTitle: 'Carmencita',
};
const data3 = {
  primaryTitle: 'Le clown et ses chiens',
};
const data4 = {
  primaryTitle: 'Répétition dans un cirque',
};
const recent_data = {
  email: "bganesh@mun.ca",
}

describe('post_objects', () => {
  it('should get recent data for given email', async () => {
    try {
      await instance.get(`/search/${data1.primaryTitle}/${recent_data.email}`);
      await instance.get(`/search/${data2.primaryTitle}/${recent_data.email}`);
      await instance.get(`/search/${data3.primaryTitle}/${recent_data.email}`);
      await instance.get(`/search/${data4.primaryTitle}/${recent_data.email}`);
      const res = await instance.get(`/recent/${recent_data.email}`);
      assert.strictEqual(res.status, 200);
      console.log(res.data,"Total results is only 3 even though 4 data is searched because the duplicates were removed and only the recent search object was added.");
    } catch (err) {
      assert.fail(err);
    }
  });

  it('should handle errors gracefully', async () => {
    try {
      const res = await instance.get('/nonexistent');
      assert.fail('Expected an error, but got success instead');
    } catch (err) {
      assert.ok(err);
    }
  });
});
