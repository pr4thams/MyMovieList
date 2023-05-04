import axios from "axios";
import assert from "assert";
import { describe, it } from "mocha";

describe('UserList', function() {
  let instance;

  before(function() {
    // Set up Axios instance
    instance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {'content-type': 'application/json'}
    });
  });

  // Define test data
  const newdata = {
    email: 'bhavesh.ganesh@gmail.com',
    tconst: 'tt0000001',
    titles: ['Awakening of Rip', 'Watering the Flowers', 'La concierge']
  };
  const errdata = {
    email: 'bhavesh.ganesh@gmail.com',
    tconst: 'errtconst',
    titles: ['Awakening of Rip', 'Watering the Flowers', 'La concierge']
  };
  const userdata = {
    firstName: 'Bhavesh',
    lastName: 'Ganesh',
    email: 'bhavesh.ganesh@gmail.com',
    password: 'bganesh',
    friends: [],
    userList: []
  };

  describe('#post_objects()', function() {
    it('should add a new user to the database and create a UserList object with the correct titles array', async function() {
      

      // Call API endpoints
        const res1 = await instance.post('/register', userdata);
        const res2 = await instance.post('/UserList', newdata);

      // Assert that response objects have expected properties
        
        assert.strictEqual(res2.status, 200);
        console.log(res2.data);
        console.log("The array is:",res2.data.userList[0].titles.join(', '))
        await instance.delete(`/users/${userdata.email}`);
    });
  });

  describe('#post_objects()', function() {
    it('should throw error if tconst does not exist', async function() {
      

      // Call API endpoints
        const res1 = await instance.post('/register', userdata);
        const res2 = await instance.post('/UserList', errdata);

      // Assert that response objects have expected properties
        
        assert.strictEqual(res2.status, 201);
        assert(res2.data.hasOwnProperty("message"));
        assert.strictEqual(res2.data.message, 'Invalid tconst');
        console.log(res2.data.message);
        await instance.delete(`/users/${userdata.email}`);
    });
  });
});