module.exports = function factory(pool) {
    
    // //a function for all the languages that were set
    async function langauges(names, lang) {

        const regex = /[^A-Za-z]\d+/g;
        const lettersOnly = names.replace(regex, "")
        const name = lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase()
        if (name === "") {
            return "";
        }
        //the function is langauge and it has two parameters that stores names, and langauges
        if (lang === "Swahili") {
            return 'Hujambo, ' + name;
            //if it was pressed shwahili then greeting(hujambo) should be returned and the name(nam)
        } else if (lang === "TshiVenda") {
            //or if chosen TshiVenda to be the greeting(aa) 
            return "Aa, " + name;
            //then the function should return the greeting(aa) and the name(nam) of the person who greeted
        } else if (lang === "Shona") {
            //or if Shona was chosen
            return "Mhoro, " + name;
            //mhoro and the name of the person who greeted would be returned
        }else {""}
    }


    async function checkUserIfExist(name) {
        var check = await pool.query('SELECT * from greetings where name = $1', [name]);
        return check.rowCount > 0;
        //check if the name has been greeted 
    }


    async function addNameToDatabase(names) {
        const regex = /[^A-Za-z]\d+/g;

        const lettersOnly = names.replace(regex, "");
        const name = lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase();
        const check = await pool.query(`select id from greetings where name = $1`, [name])
        if (check.rowCount === 0) {
            await pool.query("insert into greetings(name, counter) values($1, $2)", [name, 0]);
        }

        await pool.query('UPDATE greetings set counter=counter+1 where name = $1', [name]);
    }

    async function updateCount(name) {

        await pool.query('UPDATE greetings set counter=counter+1 where name = $1', [name]);
    }
    async function getCounter() {
        const users = await pool.query('SELECT * from greetings');
        return users.rowCount;


        //count all the people that have been greeted
    }
    /**
    * @returns 
     */
    async function findNames() {
        //gets all the names that are being
        const users = await pool.query('SELECT name from greetings');
       

        return users.rows
    }

    const getUserCount = async (name) => {
        return await pool.query('SELECT counter from greetings where name = $1', [name]);

    }

    async function remove() {
        // delete from 'TABLENAME'
        var clear = await pool.query('DELETE from greetings');
        return clear
        //killall node (for port when giving you problems)
    }

    return {
        getCounter,
        findNames,
        getUserCount,
        checkUserIfExist,
        remove,
        langauges,
        addNameToDatabase,
        updateCount

    }

}


   