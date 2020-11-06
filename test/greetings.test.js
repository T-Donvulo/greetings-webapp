const assert = require('assert');
const pg = require('pg');
const Pool = pg.Pool;
const Greet = require('../src/handler');

const connectionString = process.env.DATABASE_URL || 'postgresql://thatodonvulo:pw123@localhost:5432/greet_test';

const pool = new Pool({
    connectionString
});

const greet = Greet(pool)
/**
 * 
 * CRUD
 * i need to be able to create, read, update and delete to the database
 */

describe('greet function', () => {

    describe('greet message', () => {
        it('should greet Jan in TshiVenda', async () => {});
        it('should greet Jan in Swahili', async () => {});
        it('should greet Jan in Shona', async () => {});
    })

    // what happeneed when input is invalid?

    describe('capitalise', () => {
        it('should capitalise thato to Thato', () => {
            assert.equal('Thato', greet.capitalizeFirstLetter('thato'))
            assert.equal('Thato', greet.capitalizeFirstLetter('THATO'))
            assert.equal('Thato', greet.capitalizeFirstLetter('thaTO'))
            assert.equal('Thato', greet.capitalizeFirstLetter('tHATo'))
        })
    })


    describe('validation', () => {
        it('should return true if you pass empty string', ()=> {
            assert.equal(true, greet.isNotValidInput(""))
        })
        it('should return true if you pass string with empty spaces', ()=> {
            assert.equal(false, greet.isNotValidInput(" thato"))
        })
        it('should return true if you pass undefined', ()=> {
            assert.equal(true, greet.isNotValidInput())
        })
        it('should return true if you pass number', ()=> {
            assert.equal(true, greet.isNotValidInput(12345678))
        })
        it('should return true if you pass null', ()=> {
            assert.equal(true, greet.isNotValidInput(null))
        })
    })

    describe('error messages', () => {
        it('should return error message if you pass empty string',async  ()=> {
            assert.equal('Please enter a name.', await greet.getGreetMessage(""))
        })
        it('should return error message if you pass string with empty spaces', async ()=> {
            assert.equal('Please enter a language.', await greet.getGreetMessage("  thato"))
        })
        it('should return error message if you pass undefined', async ()=> {
            assert.equal('Please enter a name.', await greet.getGreetMessage())
        })
        it('should return error message if you pass number', async ()=> {
            assert.equal('Please enter a name.', await greet.getGreetMessage(1234))
            assert.equal('Please enter a name.', await greet.getGreetMessage('1234', 'Shona'))
        })
        it('should return error message if you pass null', async ()=> {
            assert.equal('Please enter a name.', await greet.getGreetMessage(null))
        })
    })



})

describe("create function", function () {

    beforeEach(async () => {
        await greet.deleteNames();
    })

    it("Should be able to add the user to the database", async function () {
     await   greet.addName("Thato");
        //const dbUsersCounter = await greet.counter();
        assert.equal(1, await greet.counter());
        // deepEqual -> Arrays and Objects
    })

    it("Should be able to add the users to the database", async function () {
      await  greet.addName("Thato");
        await greet.addName("Thabo");
        await greet.addName("Thabang");

        const dbUsersCounter = await greet.counter();
        assert.equal(3, dbUsersCounter);

    })

    it("Should not be able to add duplicates", async function () {
       await greet.addName("Thato");
       await greet.addName("Thato");
       await greet.addName("Thato");
       await greet.addName("Thato");
       await greet.addName("Thato");
       await greet.addName("Thato");
       await greet.addName("Thato");

        const dbUsersCounter = await greet.counter();
        assert.equal(1, dbUsersCounter);
        // deepEqual -> Arrays and Objects
    })

})


describe("read function", function () {
    beforeEach(async () => {
        await greet.deleteNames();
    })

    it("Should be able to add the user to the database", async function () {
        const greeted = await greet.getUser('Thato');
        assert.deepEqual(undefined, greeted);

        await greet.addName("Thato");
        assert.deepEqual({ name: 'Thato', counter: 1 }, await greet.getUser('Thato'));

        assert.equal(1, await greet.counter());
    })


    it("Should be able to add the users to the database", async function () { 
        await greet.addName("Thato");
        await greet.addName("Pinky");
        await greet.addName("Kgotso");

        const greeted = await greet.counter()
        assert.deepEqual(3, greeted);
    })

})

describe("update function", function () {
    beforeEach(async () => {
        await greet.deleteNames();
    })


    it("Should be able to add the user to the database", async function () {
        const greeted = await greet.counter()
        assert.deepEqual(0, greeted);

        await greet.addName("Jan")
        await greet.updateCounter("Jan")

        const user = await greet.getUser("Jan");

        assert.deepEqual(1, await greet.counter());
        assert.deepEqual(2, user.counter);
    })

    it("Should be able to update counter for multiple users", async function () {
        const greeted = await greet.counter()
        assert.deepEqual(0, greeted);

        await greet.addName("Jan")
        await greet.addName("Ben")
        await greet.updateCounter("Jan") // 2

        await greet.updateCounter("Ben")
        await greet.updateCounter("Ben") // 3

        const ben = await greet.getUser("Ben");
        const jan = await greet.getUser("Jan");

        assert.deepEqual(2, await greet.counter());
        assert.deepEqual(2, jan.counter);
        assert.deepEqual(3, ben.counter);
     })



})

describe("delete function", function () {
    beforeEach(async () => {
        await greet.deleteNames();
    })


    it("Should be able to add the user to the database", async function () {
        assert.equal(0, await greet.counter());

        await greet.addName("Jan"); // adding new name

        assert.equal(1, await greet.counter()); // names found

        await greet.deleteNames() // remove all names

        assert.equal(0, await greet.counter());
     })
   
})