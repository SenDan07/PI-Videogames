import React from "react";

export default function GenresSelect({allGenres, handler}){
    return (
        <span>
            <select onChange={e => handler(e)} defaultValue={'PLACEHOLDER'}>
                <option value='PLACEHOLDER' disabled>Sort by Genre</option>
                <option key='allGenres' value='All'>All</option>
                {allGenres.map(e => {
                    return(
                        <option key={e.id} value={e.name}>{e.name}</option>
                    )
                })
                }
            </select>
        </span>
    )
}