const { Sequelize, Op } = require('sequelize');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { retrieveVidyaMix } = require('./api_and_db');
const{ MY_VIDYA_API_KEY } = process.env;

// const findVidyaByName = async () => {
//     try{
//         const name = req.query;
//         let vidyaByName;
//         if(name){
            
//         }
//         return vidyaByName;
//     }
//     catch(err){
//         console.log(`findVidyaByName is not working properly ${err}`)
//     }    
// }

const showVidyaByName = async(req, res) =>{
    try{
        const fullVidyaInfo = await retrieveVidyaMix();
        const name = req.query.name;
        if(name){
            const apiUrl = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_VIDYA_API_KEY}`);
            let vgNamesFromApi = apiUrl.data.results.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platforms.map(plat => plat.platform.name),
                    genres:e.genres.map(genre => genre.name),
                    backgroundImage: e.background_image
                }
            })
            let vgNamesFromDB = await Videogame.findAll({
                where:{
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    }
                },
                include:{
                    model: Genre
                }
            });
            vgNamesFromDB = vgNamesFromDB.map(e=>{
                return(
                    {
                        id: e.id,
                        name: e.name,
                        description: e.description,
                        released: e.released,
                        rating: e.rating,
                        platforms: e.platforms.map((platform) => platform),
                        genres: e.genres.map((genre) => genre),
                        backgroundImage: e.backgroundImage,
                        createdInDB: e.createdInDB
                    }
                )
            })

            const vidyaByName = [...vgNamesFromApi, ...vgNamesFromDB];
            // console.log(vidyaByName.length)
            vidyaByName ? await res.status(200).send(vidyaByName) : res.status(404).json({msg: 'No se encontraron videojuegos con ese nombre.'})
        }
        else res.status(200).send(fullVidyaInfo);
    }
    catch(err){
        console.log(`showVidyaByName is not working properly ${err}`)
    }
}

const findVidyaById = async(id) => {
    try{
        let vidyaById;
        console.log(id)
        if(id.length < 7){
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
        console.log(`findVidyaById is not working properly ${err}`)
    }
}

const showVidyaById = async(req, res) => {
    try{
        let fullVidyaInfo = await retrieveVidyaMix();
        const id = req.params.id;
        if(id){
            const vidyaById = await findVidyaById(id);
            vidyaById ? res.status(200).send(vidyaById) : res.status(404).json({msg: 'El id introducido no arrojo ninguna coincidencia'})
        }
        // else res.status(200).send(fullVidyaInfo);
        else res.status(200).send(fullVidyaInfo);
    }
    catch(err){
        console.log(`showVidyaById is not working properly ${err}`)
    }
}

const createNewVidya = async (req, res) => {
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

module.exports ={
    showVidyaByName,
    showVidyaById,
    createNewVidya
}