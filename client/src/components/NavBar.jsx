import React from "react";

export default function Navigation(){
    
    return(
        <nav>
        <span>
            <select defaultValue={'placeholder1'}>
                <option value='placeholder1' disabled>Sort by Name</option>
                <option value='ascending'>A - Z</option>
                <option value='descending'>Z - A</option>
            </select>
        </span>

        <span>
            <select defaultValue={'placeholder2'}>
                <option value='placeholder2' disabled>Sort by Storage Origin</option>
                <option value='fromApi'>From Rawg</option>
                <option value='fromDB'>Created by User</option>
            </select>
        {/* </span>
            <select onChange={e => handler(e)} defaultValue={'placeholder3'}>
                <option value='placeholder3' disabled>Sort by Genre</option>
                <option value='All'>All</option>
                <GenresSelect
                allGenres={allGenres}
                />
            </select>
        <span> */}
            <select defaultValue={'default'}>
                <option value='default'>Sort by Rating</option>
                <option value='highest'>Highest</option>
                <option value='lowest'>Lowest</option>
            </select>
        </span>                
    </nav>

    )
}