import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVidya } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import VidyaCard from "./Card";

export default function Home(){
    const dispatch = useDispatch();
    const allVidya = useSelector ((state) => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const pages = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    
    useEffect(() =>{
        dispatch(fetchAllVidya())
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(fetchAllVidya());
        setCurrentPage(1)
    }

    return(
        <div>

            <Link to='/videogames'>Create new videogame</Link>

            <hi>おはよう世界！</hi>

            <button onClick={e => {handleClick(e)}}>Reload videogames</button>

            <div>

                <span>
                    <select>
                        <options value='alphabetically'>Name</options>
                        <options value='ascending'>A - Z</options>
                        <options value='descending'>Z - A</options>
                    </select>
                </span>

                <span>
                    <select>
                        <options value='byRating'>Score</options>
                        <options value='highest'>Highest</options>
                        <options value='lowest'>Lowest</options>
                    </select>
                </span>

                <span>
                    <select>
                        <options value='byGenre'>Genre</options>
                        <options value=''></options>
                    </select>
                </span>

                <span>
                    <select>
                        <options value='allGames'>All Videogames</options>
                        <options value='fromApi'>From Rawg</options>
                        <options value='fromDB'>Created by User</options>
                    </select>
                </span>

            </div>
            {
                allVidya?.map(e =>{
                    <VidyaCard
                        name={e.name}
                        genres={e.genres}
                        backgroundImage={e.backgroundImage}
                    />
                })
            }
        </div>
    )
}