module.exports = function separatedRoutes(Greet){
    async function getsCounter(req, res) {

        res.render('index', { count: await Greet.counter() });
    };

    async function home (req, res) {
        res.render('index')};

        function flashset(req, res) {
            res.redirect('/');
        };

        async function myErrorsMSG(req, res) {
            var name = req.body.name
            var language = req.body.language;
           let greeted =  await Greet.getGreetMessage(name, language);

           if(greeted.startsWith('Please')){
               req.flash('info', greeted);
               greeted = ''
           }
           
            res.render('index', {
                msg: greeted,
                count: await Greet.counter(name)
            });
        };

        async function toFindNames(req, res) {

            res.render('greeted', {
                greeted: await Greet.findGreetedNames()
            })
        
        };

        async function countIndividual(req, res) {

            var name = req.params.name;
               var namesList = await Greet.getUser(name)
                const count = namesList.counter || 0;
        
            res.render('counter', {
                greeted: count,
                user: name
            })
        
        };

        async function clearingBTN(req, res) {

            await Greet.deleteNames();
            res.redirect('/');
        };



return{
    getsCounter,
    home,
    myErrorsMSG,
    toFindNames,
    countIndividual,
    clearingBTN,
    flashset
}
}