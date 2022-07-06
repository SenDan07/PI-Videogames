const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const { showVidyaByName, showVidyaById, createNewVidya } = require('../controllers/videogame');
const { retrieveAllGenres } = require('../controllers/genre');
const { showAllPlatforms } = require('../controllers/platforms')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//get ->>> 


router.get("/videogames", showVidyaByName);
router.get("/videogames/:id", showVidyaById);
router.post("/videogames", createNewVidya)
router.get("/genres", retrieveAllGenres)
router.get("/platforms", showAllPlatforms)

module.exports = router;
