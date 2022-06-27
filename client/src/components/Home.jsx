import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVidya } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import VidyaCard from "./Card";
import Navigation from "./NavBar";
import Pagination from "./Pagination";

export default function Home(){

    const dispatch = useDispatch();
    const allVidya = useSelector(state => state.videogames);


    const [currentPage, setCurrentPage] = useState(1);
    const [vidyasPerPage] = useState(15);
    const indexOfLastVidya = currentPage * vidyasPerPage;
    const indexOfFirstVidya = indexOfLastVidya - vidyasPerPage;


    const currentThumbnails = allVidya.slice(indexOfFirstVidya, indexOfLastVidya)

    const pages = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(() =>{
        dispatch(fetchAllVidya())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(fetchAllVidya());
        setCurrentPage(1);
    }

    return(
        <div>
            <header>
                <h1>おはよう世界！</h1>
                <button onClick={e => {handleClick(e)}}>Reload videogames</button>
            </header>

            <main>
                <Navigation/>
                {
                    currentThumbnails?.map((e)=>{
                        return(
                            <Link to={'/home/' + e.id}>
                                <VidyaCard
                                    name={e.name}
                                    genres={e.genres}
                                    backgroundImage={e.backgroundImage}
                                />
                            </Link>
                        )
                    })
                }
            </main>

            <footer>
                <Link to='/videogames'>Create new videogame</Link> /
                {console.log(pages)}

                <Pagination
                    vidyasPerPage={vidyasPerPage}
                    totalVidyas={allVidya.length}
                    pages={pages}
                />

            </footer>
        </div>
    )
}