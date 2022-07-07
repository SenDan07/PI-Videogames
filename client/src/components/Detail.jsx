import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVidyaById, clearVidyaIdDetail } from "../redux/actions/actions";

export default function VidyaDetail(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const vidyaDetail = useSelector(state => state.vidyaDetail);

    useEffect(() =>{
        dispatch(fetchVidyaById(id));
        return () =>{
            dispatch(clearVidyaIdDetail());
        }
    }, [dispatch, id])

    return(
        <main>
            {console.log(vidyaDetail.platforms)}
            <button onClick={()=> navigate('/home')}>Return to Main Page</button>
            { vidyaDetail ?
            <div>
                <img src={vidyaDetail.backgroundImage} alt='File not found' width="550px" height="auto"/>
                <h1>{vidyaDetail.name}</h1>
                <p>Description: <span dangerouslySetInnerHTML={{__html: vidyaDetail.description}}/> </p>
                <p>Genres: {vidyaDetail.genres}</p>
                <p>Average Critics Score: {vidyaDetail.rating}</p>
                <p>Release Date: {vidyaDetail.released}</p>
                <h3>Available on:</h3>
                <ul>
                    {vidyaDetail.platforms?.map(e => (
                        <li key={e}>{e}</li>
                    ))}
                </ul>
            </div> :
            <h1>Could not load videogame detail</h1>
        }
        </main>
    )
}