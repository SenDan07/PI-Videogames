import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewVidya, fetchAllGenres } from "../redux/actions/actions";

export default function VidyaCreateForm(){
    const dispatch = useDispatch();
    const allGenres = useSelector(state => state.genres)
    
    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        backgroundImage: '',
        genres: []
    })

    useEffect(() => {
        dispatch(fetchAllGenres())
    }, [dispatch]);

    return(
        <main>

            <Link to='/home'>
                <button>Return to Main Page</button>
            </Link>

            <h1>Add New Videogame</h1>

            <form>

                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name'/>
                </div>

                <div>
                    <label>Description:</label>
                    <input type='text' value={input.description} name='description'/>
                </div>

                <div>
                    <label>Release Date:</label>
                    <input type='text' value={input.released} name='released'/>
                </div>

                <div>
                    <label>Average Score:</label>
                    <input type='text' value={input.rating} name='rating'/>
                </div>
                <div>
                    <label>Platforms</label>
                    <input type='text' value={input.platforms} name='platforms'/>
                </div>

                <div>
                    <label>Image</label>
                    <input type='text' value={input.backgroundImage} name='backgroundImage'/>
                </div>

                <div>
                    <label>Genres</label>
                    <input type='text' value={input.genres} name='genres'/>
                </div>

            </form>

        </main>
    )
}