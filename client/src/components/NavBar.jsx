import React from "react";

export default function Navigation(){
    return(
        <nav>
        <span>
            <select>
                <option value='alphabetically'>Name</option>
                <option value='ascending'>A - Z</option>
                <option value='descending'>Z - A</option>
            </select>
        </span>

        <span>
            <select>
                <option value='allGames'>All Videogames</option>
                <option value='fromApi'>From Rawg</option>
                <option value='fromDB'>Created by User</option>
            </select>
        </span>

        <span>
            <select>
                <option value='byGenre'>Genre</option>
                <option value=''></option>
            </select>
        </span>

        <span>
            <select>
                <option value='byRating'>Score</option>
                <option value='highest'>Highest</option>
                <option value='lowest'>Lowest</option>
            </select>
        </span>                
    </nav>

    )
}