module.exports = function separatedRoutes(Greet){
    async function getsCounter(req, res) {

        res.render('index', { count: await Greet.getCounter() });
    };

    async function home (req, res) {
        res.render('index')};

        function flashset(req, res) {
            res.redirect('/');
        };

        async function myErrorsMSG(req, res) {
            var name = req.body.name
            var language = req.body.language;
           let greeted =  await Greet.langauges(name, language);
            if (name === '' && language === undefined) {
                req.flash('info', 'Please Enter Name & select language!')
            } else if (language === 'Swahili' && name === '') {
                req.flash('info', 'Ingiza Jina Lako')
            } else if (language === 'TshiVenda' && name === '') {
                req.flash('info', 'Dzina Lavho')
            } else if (language === 'Shona' && name === '') {
                req.flash('info', 'Pinda Zita')
            } else if (language === undefined) {
                req.flash('info', 'Select language!')
            } else if(isNaN(name) === false){
                req.flash('info', 'letters only A-Z, a-z!')
            }   else {
                 await Greet.addNameToDatabase(name);
                
            }
            res.render('index', {
                msg: greeted,
                count: await Greet.getCounter(name)
            });
        };

        async function toFindNames(req, res) {

            res.render('greeted', {
                greeted: await Greet.findNames()
            })
        
        };

        async function countIndividual(req, res) {

            var name = req.params.name;
               var namesList = await Greet.getUserCount(name)
                const count = namesList.rows[0].counter || 0;
        
            res.render('counter', {
                greeted: count,
                user: name
            })
        
        };

        async function clearingBTN(req, res) {

            await Greet.remove();
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