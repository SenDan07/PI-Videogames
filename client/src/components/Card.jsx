import React from "react";
import styled from 'styled-components'

export default function VidyaCard({id, name, genres, backgroundImage}){
    const CardGridDiv = styled.div`
    /* display: grid; */
    `
    return(
        <CardGridDiv key={id}>
            <h2>{name}</h2>
            <h4>{genres}</h4>
            <img src={backgroundImage} alt="videogame cover" width="350px" height="auto" />
        </CardGridDiv>
    )
}