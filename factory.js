module.exports = function factory() {

    //created an object for list names that are greeted
    var namesList = {}
    //var counts = 0;
    
    //created a function that sets names
    function setNames(name) {
        //if an object is not a string then it should be undefined
        if (namesList[name] === undefined) {
            //the object should be zero
            namesList[name] = 0
        }
        namesList[name]++;
    }
    //gets the names that have been greeted
    function getNames() {
        //this function should return an object
        return namesList

    }


    //a function for all the languages that were set
    function langauges(nam, lang) {
        //the function is langauge and it has two parameters that stores names, and langauges
        if (lang === "Swahili") {
            return 'Hujambo, ' + nam;
            //if it was pressed shwahili then greeting(hujambo) should be returned and the name(nam)
        } else if (lang === "TshiVenda") {
            //or if chosen TshiVenda to be the greeting(aa) 
            return "Aa, " + nam;
            //then the function should return the greeting(aa) and the name(nam) of the person who greeted
        } else if (lang === "Shona") {
            //or if Shona was chosen
            return "Mhoro, " + nam
            //mhoro and the name of the person who greeted would be returned

        } else {
            return "Choose a langauge please!!!"
        }

    }


    function counterFun() {

        //the function that counts how many a people were greeted. 

       return Object.keys(namesList).length;
        

    }

    function userCounter(name) {
        for (const key in namesList) {
            if (key === name) {
                var number = namesList[key];   
            }
        }
        return number
    }

    //functions are returned
    return {
        setNames,
        getNames,
        langauges,
        counterFun,
        userCounter
    }

}