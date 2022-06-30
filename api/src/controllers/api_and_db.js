const { Sequelize } = require('sequelize');
require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const{ MY_VIDYA_API_KEY } = process.env;

const retrieveVidyaFromApi = async(items = [], pageNumber = 1) =>{
    try {
        if(items.length < 100){
            let apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${MY_VIDYA_API_KEY}&page=${pageNumber}&page_size=25`)
            let apiData = apiUrl.data.results.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    description: e.description,
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platforms.map(e => e.platform.name),
                    genres: e.genres.map(e => e.name),
                    backgroundImage: e.background_image
                }
            })
            pageNumber++;
            items = items.concat(apiData);
            items = await retrieveVidyaFromApi(items, pageNumber);
        }
        return items;
    }
    catch(err){
        console.log(`Unable to fetch vidya info from API ${err}`)
    }
}

const retrieveVidyaFromDB = async() => {
    try{
        const vidyaDB = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        const vidyaDBResponse = vidyaDB.map(e=>{
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
        return vidyaDBResponse;
    }
    catch(err){
        console.log(`Unable to retrieve vidya from DB ${err}`);
    }
}

const retrieveVidyaMix = async() => {
    try{
        const vidyaFromApi = await retrieveVidyaFromApi();
        const vidyaFromDB = await retrieveVidyaFromDB();
        const allVidya = [...vidyaFromApi, ...vidyaFromDB];
        return allVidya;
    }
    catch(err){
        console.log(`Unable to retrieve mix ${err}`)
    }
}

module.exports = {
    retrieveVidyaMix
}