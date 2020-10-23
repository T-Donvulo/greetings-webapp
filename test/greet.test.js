const assert = require("assert");
const pg = require("pg");
const Pool = pg.Pool;
const Greet = require("../factory");

const connectionString = process.env.DATABASE_URL || 'postgresql://thatodonvulo:pw123@localhost:5432/greet_test';

const pool = new Pool({
    connectionString
});

// const greetings = Greet(pool);

describe("The greetings", function () {

    beforeEach(async function () {

        await pool.query("delete from greetings;");
    });

    it("should be able to greet Tshitende in Swahili", async function () {

        const greetings = Greet(pool);
        // greetings.

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

    // it("should be able to get names", async function () {
    //     const greetings = Greet(pool);

    //     await greetings.addNameToDatabase("Luruli");
    //     await greetings.addNameToDatabase("Luruli");

    //     var names = await greetings.checkUserIfExist();

    //     assert.equal(names[0].names , "Luruli")
        
    // })


    
    it("should be able to add peoples name in the database and get their counter", async function () {
const greetings = Greet(pool);
        await greetings.addNameToDatabase("Lurulo");

        const counter = await greetings.getCounter("Luruli");

        assert.equal(1, counter);
    })



    after(function () {
        pool.end();
    })

});


