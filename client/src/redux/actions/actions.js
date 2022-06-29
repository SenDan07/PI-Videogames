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
            console.log(`Unable to retrieve videogames JSON from server. ${err}`)
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
            console.log(`Unable to retrieve genres JSON from server, ${err}`)
        }
    }
}

export function filterByGenre(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload: payload
    }
}

export function filterByDataStorage(){
    return{
        type: 'FILTER_BY_DATA_STORAGE',
        // payload
    }

}
export function sortAlphabetically(){}

export function sortByRating(){}
