// module.exports = function routes(pool){
    

//     async function home(){
//         res.render('index', {count:  await Greet.getCounter()});
   
//     }

//     async function home_greetMessage(){
//         var name = req.body.name
//     var language = req.body.language;


//     const msg = await Greet.greetMessage(name, language)

//     res.render('index', {
//         msg,
//         count: await Greet.getCounter(),
//     });

//     }

//     async function greetedPeople(){
//         res.render('greeted', {
//             greeted: await  Greet.findNames()
//         })
        

//     }

//     async function countPeople(){
//         var name = req.params.name;
//         // if(name.startsWith('style.css'))
//         // console.log({name});
        
//         var namesList = await Greet.getUserCount(name)
//         console.log(namesList);
    
//         const count = namesList.rows[0].counter || 0;
    
    
//         res.render('counter', {
//             greeted: count,
//             user: name
//         });
        
//     }

//     async function clear(){
//         await Greet.remove();
//         res.redirect('/');
    
//     }

// return{
//     home,
//     home_greetMessage,
//     greetedPeople,
//     countPeople,
//     clear
 

// }
    
// }