const { Sequelize } = require('sequelize');
require('dotenv').config();
const axios = require('axios');
const { MY_VIDYA_API_KEY } = process.env;

const retrievePlatformsFromApi = async(items = [], pgNum = 1) =>{
    try {

        if(items.length < 51){
            let apiUrl = await axios.get(`https://api.rawg.io/api/platforms?key=${MY_VIDYA_API_KEY}&page=${pgNum}`);
            let apiData = apiUrl.data.results.map(e => {
                return{
                    id: e.id,
                    name: e.name
                }
            })
            pgNum++;
            items = items.concat(apiData).sort((a, b) => a.id - b.id);
            items = await retrievePlatformsFromApi(items, pgNum);
        }
        console.log(items.length)
        return items;
    }
    catch(err) {
        console.log(`Unable to fetch platform list from API, ${err}`)
    }
}

const showAllPlatforms = async(req, res) =>{
    try {
        const fullPlatformInfo = await retrievePlatformsFromApi();
        fullPlatformInfo ? await res.status(200).send(fullPlatformInfo) : res.status(404).json({msg: 'No se encontró el listado de plataformas.'});
        
    } catch(err) {
        console.log(`showAllPlatforms is not working properly ${err}`)
    }

}

module.exports = {
    showAllPlatforms
}