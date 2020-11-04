const assert = require("assert");
const pg = require("pg");
const Pool = pg.Pool;
const Greet = require("../factory");

const connectionString = process.env.DATABASE_URL || 'postgresql://thatodonvulo:pw123@localhost:5432/greet_test';

const pool = new Pool({
    connectionString
});


describe("The greetings", function () {

    beforeEach(async function () {

        await pool.query("delete from greetings;");
    });

    it("should be able to greet Tshitende in Swahili", async function () {

        const greetings = Greet(pool);

        assert.equal("Hujambo, Tshitende", await greetings.langauges("Tshitende", "Swahili"));
    })

    it("should be able to greet Luruli in TshiVenda", async function () {
        const greetings = Greet(pool);
        assert.equal("Aa, Ntswaki", await greetings.langauges("Ntswaki", "TshiVenda"));

    })

    it("should be able to greet Mudiwa in Shona", async function () {
       const greetings = Greet(pool);
        assert.equal("Mhoro, Mudiwa", await greetings.langauges("Mudiwa", "Shona"));

    })

    it("should be able to add names to database and get user counter", async function () {
        const greetings = Greet(pool);

        await greetings.addNameToDatabase("Thato");
        await greetings.addNameToDatabase("Puseletso");

        const counter = await greetings.getCounter("Thato");


        assert.equal(2, counter);
    })

  it("Should be able to check if the user exists",  async function(){
      const greetings = Greet(pool);
       assert.equal( false ,await greetings.checkUserIfExist("Thato"));   

  })

  it("Should find the names of the users", async function(){
      const greetings = Greet(pool);
     await greetings.findNames("Thato");

  })

  it("Should be able to count individual user", async function(){
      const greetings = Greet(pool);
      await greetings.getUserCount("Thato");
      
  })
 it("should be able to update the count of a users", async function(){
      const greetings = Greet(pool);
      await greetings.updateCount("Thato");
  })
  it("Should be able to count all the users who have been greeted", async function(){
      const greetings = Greet(pool);
      await greetings.getCounter("Thato");
  })
  it("Should be able to remove users on the database", async function(){
      const greetings = Greet(pool);
      await greetings.remove("Thato")
  })

    after(function () {
        pool.end();
    })

});


