const { Sequelize } = require('sequelize');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { retrieveVidyaMix } = require('./api_and_db');
const e = require('express');

const showVidyaByName = async(req, res) =>{
    const fullVidyaInfo = await retrieveVidyaMix();
    const name = req.query.name;
    if(name){
        let vidyaName = fullVidyaInfo.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        vidyaName ? await res.status(200).send(vidyaName) : res.status(404).json({msg: 'No se encontraron videojuegos con ese nombre.'})
    }
    else res.status(200).send(fullVidyaInfo);
}

const findVidyaById = async(id) => {
    try{
        let vidyaById;
        if(id.length < 7){ //no detecta el typeof,
            const idApiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${MY_VIDYA_API_KEY}`);
            vidyaById = {
                id: idApiUrl.data.id,
                name: idApiUrl.data.name,
                description: idApiUrl.data.description,
                released: idApiUrl.data.released,
                rating:idApiUrl.data.rating,
                platforms: idApiUrl.data.platforms.map(e => e.platform.name),
                genres: idApiUrl.data.genres.map(e=> e.name),
                backgroundImage: idApiUrl.data.background_image
                
            }
        }
        else{
            vidyaById = await Videogame.findOne({
                where:{
                    id: id
                },
                include:{
                    model: Genre
                }
            });
        }
        return vidyaById;
    }
    catch(err){
        console.log(err)
    }
}

const showVidyaById = async(req, res) => {
    const fullVidyaInfo = await retrieveVidyaMix();
    const id = req.params.id;
    try{
        if(id){
            const vidyaById = await findVidyaById(id);
            vidyaById ? res.status(200).send(vidyaById) : res.status(404).json({msg: 'El id introducido no arrojo ninguna coincidencia'})
        }
        else res.status(200).send(fullVidyaInfo);
    }
    catch(err){
        console.log(err)
    }
}

const createNewVideogame = async (req, res) => {
    const { name, description, released, rating, platforms, genre, backgroundImage }  = req.body;
    try{
        const vidyaCreate = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            backgroundImage
        });
        const allGenres = await Genre.findAll({
            where: {
                name: genre
            }
        });
        vidyaCreate.addGenre(allGenres);
        res.status(200).send(vidyaCreate);
    }
    catch(err){
        console.log(`No se pudo crear el videojuego ${err}`)
    }
}