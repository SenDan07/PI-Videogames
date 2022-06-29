const initialState = {
    fixedVG: [],
    permutableVG: [],
    genres: []
};

export default function rootReducer( state = initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                fixedVG: action.payload,
                permutableVG: action.payload
            }
        
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }

        case 'FILTER_BY_GENRE':
            let allVidya = state.fixedVG
            const filteredByGenre = action.payload === 'All' ? allVidya : allVidya.filter(e => e.genres?.includes(action.payload))
            return{
                ...state,
                permutableVG: filteredByGenre
            }
            
            default: {
                return{
                    ...state
                }
            }
    }
};