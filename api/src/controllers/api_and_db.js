import { Sequelize } from 'sequelize';
require('dotenv').config();
import { get } from 'axios';
import { Videogame, Genre } from '../db';
const{ MY_VIDYA_API_KEY } = process.env;

// const retrieveVidyaFromApi = async() => {
//     let apiUrl = `https://api.rawg.io/api/games?key=${MY_VIDYA_API_KEY}&page=${i}&page_size=25`
//     const vidyaResultsArray = [];
// }
// let i=1;
// let apiUrl = `https://api.rawg.io/api/games?key=${MY_VIDYA_API_KEY}&page=${i}&page_size=25`
// const vidyaResultArray = [];
// const retrieveVidyaFromApi = async(items, pageNumber) => {
//     try{
//         if(items.length < 100){
            
//         }
//         const apiInfo = await get(apiUrl).data.results.map(e=>{
//             return{
//                 id: e.id,
//                 name: e.name,
//                 description: e.description,
//                 released: e.released,
//                 rating: e.rating,
//                 platforms: e.platforms.map(e => e.platform.name),
//                 genres: e.genres.map(e=> e.name)
//                 image: e.background_image
//             }
//         })
//         if(vidyaResultArray.length<100){
//             i++;
//             vidyaResultArray.push(apiInfo);
//         } else{
//             return vidyaResultArray;
//         }
//     }
//     catch(err){
//         console.log(`Unable to fetch API info. ${err}`)
//     }
// }

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
        console.log(err);
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
        console.log(err)
    }
}

export default{
    retrieveVidyaMix
}