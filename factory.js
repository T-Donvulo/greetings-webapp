module.exports = function factory(pool) {

    // //a function for all the languages that were set
    function langauges(name, lang) {
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

        } else {
            return "Choose a langauge please!!!"
        }

    }


    async function greetMessage(names, langauge) {
        const regex = /[^A-Za-z]\d+/g;
        
        const lettersOnly = names.replace(regex, "");
        const name = lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase()

        if (name === "" && langauge === undefined) {
            return "Please Enter Name and Select language of your choice!!"
        }
   
        else if (langauge === undefined) {
            // return error: name is not provided
            return "Please Select language!!";
        } else if (name === "") {
            if(langauge === "Swahili"){
                return "Ingiza Jina Lako";
            }else if (langauge === "TshiVenda"){
                return "Dzina Lavho";
            }
            else if(langauge === "Shona"){
                return "Pinda Zita";
            }
         
        }
        //check if name && language is entered
        else {
            try {

                if (await checkUserIfExist(name)) {
                    // if is true, it means name exist in database
                    await updateCount(name)
                } else {
                    await addNameToDatabase(name);
                }

                return langauges(name, langauge)

            } catch (error) {
                console.log(error)
                return error;
            }
        }
    }


    async function checkUserIfExist(name) {
        var check = await pool.query('SELECT * from greetings where name = $1', [name]);
        return check.rowCount > 0;

    }


    const addNameToDatabase = async (name) => await pool.query("insert into greetings(name, counter) values($1, $2)", [name, 1]);

    //   async function addNameToDatabase(name) {
    //         await pool.query("insert into greetings(name, counter) values($1, $2)", [name, 1]);


    //     }


    async function updateCount(name) {

        await pool.query('UPDATE greetings set counter=counter+1 where name = $1', [name]);
    }


    async function getCounter() {
        const users = await pool.query('SELECT * from greetings');
        return users.rowCount;
    }


    /**
     * @returns list of greeted names
     */
    async function findNames() {

        const users = await pool.query('SELECT * from greetings');
        console.log({ users: users.rows });

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
        greetMessage,
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


    //created an object for list names that are greeted
    //  var namesList = {}
    //var counts = 0;

    //created a function that sets names
    // async function setNames(name) {;
    //     var firstName = await pool.query('insert into greetings(name,counter) values ($1,$2)', [name, 1])
    //     //if an object is not a string then it should be undefined
    //     // if (namesList[name] === undefined) {
    //     //     //the object should be zero
    //     //     namesList[name] = 0counter
    //     // }
    //     // namesList[name]++;
    // }

    // async function greet(name) {
    //     let tableName  = await pool.query('SELECT * from greetings');
    //     console.log( tableName.rows + " fdfdfdfdfdf")

    //     if (tableName.length === 0) {
    //         await setNames(name)
    //     }

    // }

    // //gets the names that have been greeted
    // function getNames() {
    //     //this function should return an object
    //     return namesList

    // }
    // async function checkNames(name) {
    //     var check = await pool.query('SELECT name from greetings where name=$1', [name]);
    //     console.log(check)
    //     return check.rows;
    // }

    // async function update() {
    //     var updates = await pool.query('UPDATE greetings set counter=counter+1');
    // }


    // function counterFun() {

    //     //the function that counts how many a people were greeted. 

    //     return Object.keys(namesList).length;

    // }

    // function userCounter(name) {
    //     for (const key in namesList) {
    //         if (key === name) {
    //             var number = namesList[key];
    //         }
    //     }
    //     return number
    // }

    // async function clearBtn() {
    //     await pool.query('delete FROM greetings');
    // }

    //functions are returned



    /*** database functions | CRUD (Create, Read, Update & Delete) */