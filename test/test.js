const assert = require("assert");
const pg = require("pg");
const Pool = pg.Pool;
const Greet = require("../factory");

const connectionString = process.env.DATABASE_URL || 'postgresql://thatodonvulo:pw123@localhost:5432/greet_test';

const pool = new Pool({
    connectionString
});

const greetings = Greet(pool);

describe("The greetings", function () {

    beforeEach(async function () {

        await pool.query("delete from greetings;");
    });

    it("should be able to greet Tshitende in Swahili", async function () {

        const greetings = Greet(pool);

        assert.equal("Hujambo, Tshitende", await greetings.checkUserIfExist("Tshitende", "Swahili"));
    })

    it("should be able to greet Luruli in TshiVenda", async function () {
        const greetings = Greet(pool);
        assert.equal("Aa, Ntswaki", await greetings.checkUserIfExist("Ntsawki", "TshiVenda"));

    })

    it("should be able to greet Mudiwa in Shona", async function () {
       const greetings = Greet(pool);
        assert.equal("Mhoro, Mudiwa", await greetings.checkUserIfExist("Mudiwa", "Shona"));

    })

    // it("should be able to add names to database and get user counter", async function () {
    //     const greetings = Greet(pool);

    //     await greetings.addNameToDatabase("Thato");
    //     await greetings.addNameToDatabase("Thato");

    //     const counter = await greetings.getCount("Thato")


    //     assert.equal(2, counter);
    // })

    // it("should be able to get names", async function () {
    //     const greetings = Greet(pool);

    //     await greetings.addNameToDatabase("Luruli");
    //     await greetings.addNameToDatabase("Luruli");

    //     var names = await greetings.getNames();

    //     assert.equal(names[0].name , "Luruli")
        
    // })


    
    // it("should be able to add peoples name in the database and get their counter", async function () {

    //     await greetings.addNameToDatabase("Lurulo");

    //     const counter = await greetings.getCount("Luruli");

    //     assert.equal(1, counter);
    // })



    after(function () {
        pool.end();
    })

});


