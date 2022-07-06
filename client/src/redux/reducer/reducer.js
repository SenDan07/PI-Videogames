const initialState = {
    fixedVG: [],
    permutableVG: [],
    genres: [],
    platforms: []
};

export default function rootReducer( state = initialState, action){
    let allVidya;
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

        case 'GET_PLATFORMS':
            return{
                ...state,
                platforms: action.payload
            }

        case 'GET_VIDEOGAME_BY_NAME':
            return{
                ...state,
                permutableVG: action.payload
            }

        case 'FILTER_BY_GENRE':
            allVidya = state.fixedVG;
            const filteredByGenre = action.payload === 'All' ? allVidya : allVidya.filter(e => e.genres?.includes(action.payload));
            return{
                ...state,
                permutableVG: filteredByGenre
            }

        case 'FILTER_BY_DATA_STORAGE':
            allVidya = state.fixedVG;
            const filteredByStorage = action.payload === 'fromDB' ? allVidya.filter(e => e.createdInDB) : allVidya.filter(e => !e.createdInDB);
            return{
                ...state,
                permutableVG: action.payload === 'All' ? state.fixedVG : filteredByStorage
            }

        case 'SORT_ALPHABETICALLY':
            const sortbyNamePacket = state.fixedVG.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            const sortedByName = action.payload === 'ascending' ? sortbyNamePacket: sortbyNamePacket.reverse();
            return{
                ...state,
                permutableVG: sortedByName
            }

        case 'SORT_BY_RATING':
            const sortedByRatingPacket = state.fixedVG.sort((a, b) => a.rating - b.rating);
            const sortedByRating = action.payload === 'lowest' ? sortedByRatingPacket : sortedByRatingPacket.reverse();
            return{
                ...state,
                permutableVG: sortedByRating
            }

        // case 'POST_NEW_VIDEOGAME':
        //     return{
        //         ...state
        //     }

            default: {
                return{
                    ...state
                }
            }
    }
};