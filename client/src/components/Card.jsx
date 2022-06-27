import React from "react";

export default function VidyaCard({id, name, genres, backgroundImage}){
    return(
        <div>
            <h2>{name}</h2>
            <h4>{genres}</h4>
            <img src={backgroundImage} alt="videogame cover" width="350px" height="auto" />
        </div>
    )
}