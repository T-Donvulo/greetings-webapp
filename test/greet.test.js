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

      await greetings.addNameToDatabase("Thato");
      await greetings.addNameToDatabase("Puseletso");

    var names =  await greetings.findNames();
    assert.deepEqual(  [
        {
          name: 'Thato'
        },
        {
          name: 'Puseletso'
        }
      ]
       ,names);

  })
//you said I should fix this
  it("Should be able to count individual user", async function(){
      const greetings = Greet(pool);

      await greetings.addNameToDatabase("Thato");
      await greetings.addNameToDatabase("Thato");

      var userCount = await greetings.getUserCount("Thato");
      const count = userCount.rows[0].counter 
     assert.equal(2 ,count);
  })


  it("Should be able to count all the users who have been greeted", async function(){
      
    const greetings = Greet(pool);

    await greetings.addNameToDatabase("Thato");
    await greetings.addNameToDatabase("Pule");
    await greetings.addNameToDatabase("Zantu");

    var CountAll = await greetings.getCounter("Kgotso");
   
   assert.equal(3 ,CountAll);

  })
it("Should be able to remove users on the database", async function(){
  await pool.query( "delete from greetings")    
})

    after(function () {
        pool.end();
    })

});










