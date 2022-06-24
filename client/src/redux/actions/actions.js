import axios from 'axios';

export function fetchAllVidya(){
    return async function(dispatch){
        const vidyaPacket = await axios.get("/videogames");
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: vidyaPacket.data
        })
    }
}