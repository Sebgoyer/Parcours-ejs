const express = require('express');
const bcrypt = require('bcrypt');
const games = require('../games.json');
const users = require('../users.json');
const logger = require('./logger');

const router = express.Router();


router.use(logger.log, (request, response, next) => {
    response.locals.games = games;
    next();
});

router.get('/', (request, response) => {
    response.render('index', { title: 'Bienvenue sur le site' });
});

router.get('/game/:gameName', (request, response, next) => {
    const gameName = request.params.gameName;
    const game = games.find(currentGame => currentGame.name === gameName);

 
    if (!game) {
        
        return next();
        
    }

    response.render(gameName, game);
});

router.get('/search', (request, response) => {
    
    const gameSearch = request.query.q;

    const gamesFound = games.filter(game => game.title.toLowerCase().includes(gameSearch.toLowerCase()));
    //dans tous les cas gamesFound retournera un tableau, vide ou rempli

    response.render('search', { gamesFound });
});

router.get('/login', (request, response) => {
    response.render('login');
});

router.post('/login', (request, response) => {
   
    /*
    {
        username: 'Yann',
        password: 'motdepasse'
    }
    */
    const { username, password } = request.body;
    const userFound = users.find(user => user.userName === username);

    if (!userFound) {
        
        return response.status(401).render('login', { error: `Les informations de connexions sont invalides` })
    }

    
    bcrypt.compare(
       
        password,
        
        userFound.password,
        
        function (err, result) {

            if (err) {
               
                console.error(err);
                return response.status(500).render('login', { error: `Désolé, une erreur serveur est intervenu, veuillez réessayer ultérieurement` });
            }

            if (!result) {
               
                return response.status(401).render('login', { error: `Les informations de connexions sont invalides` });
            }

          
            request.app.locals.user = userFound;

            
            response.redirect('/');

        });
});

router.get('/logout', (request, response) => {
    request.app.locals.user = null;
    response.redirect('/');
});


router.use((_, response) => {
    response
        .status(404)
        .render('error404', { title: 'erreur 404' });
});

module.exports = router;