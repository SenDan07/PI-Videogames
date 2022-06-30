import React from "react";

export default function Navigation({ byNameCB, dataStorageCB, byRatingCB }){
    //component not working properly, props not detected as functions at the time of execution
    return(
        <nav>
        <span>
            <select onChange={e => byNameCB(e)} defaultValue={'placeholder1'}>
                <option value='placeholder1' disabled>Sort by Name</option>
                <option value='ascending'>A - Z</option>
                <option value='descending'>Z - A</option>
            </select>
        </span>

        <span>
            <select onChange={e => dataStorageCB(e)} defaultValue={'placeholder2'}>
                <option value='placeholder2' disabled>Filter by Storage Origin</option>
                <option value='All'>All</option>
                <option value='fromApi'>From Rawg</option>
                <option value='fromDB'>Created by User</option>
            </select>

            <select onChange={e => byRatingCB(e)} defaultValue={'default'}>
                <option value='default'>Sort by Rating</option>
                <option value='highest'>Highest</option>
                <option value='lowest'>Lowest</option>
            </select>
        </span>                
    </nav>

    )
}