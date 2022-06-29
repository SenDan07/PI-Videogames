const { Sequelize } = require('sequelize');
const { Genre } = require('../db')
const axios = require('axios');
const { MY_VIDYA_API_KEY } = process.env;

const retrieveAllGenres = async(req, res) => {
    try{
        const apiGenreData = await axios.get(`https://api.rawg.io/api/genres?key=${MY_VIDYA_API_KEY}`);
        let allGenres = apiGenreData.data.results.map(e => e.name);
        for(index of allGenres){
            await Genre.findOrCreate({
                where: {
                    name: index
                }
            })
        }
        const allGenreList = await Genre.findAll();
        res.status(200).send(allGenreList);
    }
    catch(err){
        console.log(`Unable to retrieve genres list ${err}`);
    }
}

module.exports = {
    retrieveAllGenres
}