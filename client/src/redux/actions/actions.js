import axios from 'axios';

export function fetchAllVidya(){
    return async function(dispatch){
        const vidyaPacket = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: vidyaPacket.data
        })
    }
}