module.exports = function handler(pool) {

    // use this for dynamic radio buttons
    const langauges = {
        Swahili: 'Hujambo, ',
        TshiVenda: 'Aa, ',
        French: 'Bonjour, ',
        Shona: 'Mhoro, ',
    }

    /**
     * 
     * @param {String} name 
     * @param {String} language 
     * @returns greet message 
     */
    async function getGreetMessage(name, language) {
        if (isNotValidInput(name)) {
            return "Please enter a name."
        }
        name = name.trim()

        if (isNotValidInput(language)) {
            return "Please enter a language."
        }

        name = capitalizeFirstLetter(name)
       // language = capitalizeFirstLetter(language)

        if(await checkUserIfExist(name) ) {
            await updateCounter(name)
        } else {
            await addName(name)
        }    

        return langauges[language] + name + "!"
    }

    function capitalizeFirstLetter(stringName) {
        // do the work
        stringName = stringName.toLowerCase();
        stringName = stringName.substring(0, 1).toUpperCase() + stringName.substring(1);
        return stringName;

    }

    function isNotValidInput(name) {

        // do the work
        if (typeof name === 'number') {
            return true
        }
        if (name === null) {
            return true
        }

        if (name === undefined) {
            return true
        }

        if (name === "") {
            return true
        }

        if (name.trim().length == 0) {
            return true
        }

        if (!isNaN (name)){
            return true
        }

        return false;
    }

    async function getUser(name) { 
        var user = await pool.query(`select name, counter from greetings where name = $1`, [name])
        return user.rows[0]
    } // check if user is in db

    async function addName(name) {
        if(await checkUserIfExist(name)) {
            return 
        }
        await pool.query("insert into greetings(name, counter) values($1, $2)", [name, 1]);
     }  //
    
    
    async function updateCounter(name) { 
        await pool.query('UPDATE greetings set counter=counter+1 where name = $1', [name]);
    } //


    async function counter() { 
        const users = await pool.query('SELECT * from greetings');
        return users.rowCount;
    }
    async function findGreetedNames() {
        const users = await pool.query('SELECT * from greetings');
        return users.rows;
     }
    async function deleteNames() { 
        await pool.query('DELETE from greetings');
    }

    async function checkUserIfExist(name) {
        var check = await pool.query('SELECT * from greetings where name = $1', [name]);
        return check.rowCount > 0;
        //check if the name has been greeted 
    }



    /**
     * Workflow
     * 1. Enter name & languge
     * 2. Check if they are valid inputs
     * 3. Generate greet message
     * 4. Add or update name/user count
     * 5. Return greet message
     */

    /**
     * Counter
     * 1. You get a name, return number of time a name is entered/greeted
     * 2. Count all greeted/names in the database
     */

    /**
     * Reset
     * 1. delete all names in database
     */

    /**
     * Update Count
     * 1. Get name from input
     * 2. Check if is valid
     * 3. Check if it exist in the database
     * 4. Create or update
     */
    return {
        capitalizeFirstLetter,
        isNotValidInput,
        getGreetMessage,
        addName,
        updateCounter,
        getUser,
        deleteNames,
        counter,
        findGreetedNames
    }
}