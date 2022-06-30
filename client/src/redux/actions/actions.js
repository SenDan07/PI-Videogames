import axios from 'axios';

export function fetchAllVidya(){
    return async function(dispatch){
        try {
            
            const vidyaPacket = await axios.get("http://localhost:3001/videogames");
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: vidyaPacket.data
            })
        } catch(err) {
            console.log(`Unable to retrieve videogames JSON from server. ${err}`);
        }
    }
}

export function fetchAllGenres(){
    return async function(dispatch){
        try{
            const genrePacket = await axios.get("http://localhost:3001/genres");
            return dispatch({
                type:'GET_GENRES',
                payload: genrePacket.data
            })
        }
        catch(err){
            console.log(`Unable to retrieve genres JSON from server, ${err}`);
        }
    }
}

export function fetchVidyaByName(name){
    return async function(dispatch){
        try {
            const vidyaNameMatch = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: 'GET_VIDEOGAME_BY_NAME',
                payload: vidyaNameMatch.data
            })
        }
        catch(err){
            console.log(`Unable to retrieve videogame by name from server. ${err}`);
        }
    }
}

export function postNewVidya(payload){
    return async function(){
        try {
            const newVidyaPacket = await axios.post(`http://localhost:3001/videogames`, payload);
            return newVidyaPacket;
            /*return{
                type: 'POST_NEW_VIDEOGAME',
                payload: newVidyaPacket
            }
            */
        }
        catch(err){
            console.log(`Unable to upload new videogame to DB. ${err}`);
        }
    }
}

export function filterByGenre(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload: payload
    }
}

export function filterByDataStorage(payload){
    return{
        type: 'FILTER_BY_DATA_STORAGE',
        payload: payload
    }

}
export function sortAlphabetically(payload){
    return{
        type: 'SORT_ALPHABETICALLY',
        payload: payload
    }
}

export function sortByRating(payload){
    return{
        type: 'SORT_BY_RATING',
        payload: payload
    }
}
