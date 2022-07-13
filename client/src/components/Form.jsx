import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postNewVidya, fetchAllVidya, fetchAllGenres, fetchAllPlatforms} from "../redux/actions/actions";
import BlankCheckboxInput from "./FormCheckbox";
import validations from "./extra_code_snippets/validations";
 //cambiar checkbox de genres y platfroms a select
 //sacar las alerts y poner boton de submit disabled
 //el boton de creacion debe estar arriba

export default function VidyaCreateForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allGenres = useSelector(state => state.genres);
    const allPlatforms = useSelector(state => state.platforms);
    
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        backgroundImage: '',
        genres: []
    });

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validations({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    const handleCheckGenres = (e) =>{
        const { checked, name } = e.target;
        let checkedGenres = [];
        checked ? checkedGenres = [...input.genres, name] : checkedGenres = [...input.genres].filter(e => e !== name);
    
        setInput({
            ...input,
            genres: checkedGenres
        });

        setErrors(validations({
            ...input,
            genres: checkedGenres
        }))
    };

    const handleCheckPlatforms = (e) => {
        const { checked, name } = e.target;
        let checkedPlatforms = [];
        checked ? checkedPlatforms = [...input.platforms, name] : checkedPlatforms = [...input.platforms].filter(e => e !== name);
    
        setInput({
            ...input,
            platforms: checkedPlatforms
        });

        setErrors(validations({
            ...input,
            platforms: checkedPlatforms
        }))
    
    };

    const handleSubmit = (e) =>{
        // console.log(Object.values(input))
        e.preventDefault();
        if(!input.name || !input.description || !input.released || !input.rating || !input.platforms || !input.genres || !input.backgroundImage || Object.keys(errors).length !== 0){
            alert('Please edit your submission before proceeding');
        }
        else{
            dispatch(postNewVidya(input));
            setInput({
            name: '',
            description: '',
            released: '',
            rating: '',
            platforms: [],
            backgroundImage: '',
            genres: []
            });
            alert('Videogame added successfully');
            navigate('/home');
        }
    }
    
    useEffect(() =>{
        dispatch(fetchAllGenres())
    }, [dispatch]);

    useEffect(() =>{
        dispatch(fetchAllVidya())
    }, [dispatch]);

    useEffect(() =>{
        dispatch(fetchAllPlatforms())
    }, [dispatch]);

    return(
        <main>
        <button onClick={() => navigate('/home')}>Return to Main Page</button>

        <h1>Add New Videogame</h1>

        <form onSubmit={e => handleSubmit(e)} >

            <div>
                <label htmlFor='name'>Name:</label>
                <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                {errors.name && (
                    <p className="error">{errors.name}</p>
                )}
            </div>

            <div>
                <label htmlFor='description'>Description:</label>
                <input type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} />
                {errors.description && (
                    <p className="error">{errors.description}</p>
                )}
            </div>

            <div>
                <label htmlFor='releasedDate'>Release Date:</label>
                <input type='date' id="releasedDate" value={input.released} name='released' onChange={(e) => handleChange(e)} />
                {errors.released && (
                    <p className="error">{errors.released}</p>
                )}
                
            </div>

            <div>
                <label htmlFor='rating' >Average Score:</label>
                <input type='number' value={input.rating} name='rating' min={0} max={5} placeholder='0.00' step='0.01' onChange={(e) => handleChange(e)} />
                {errors.rating && (
                    <p className="error">{errors.rating}</p>
                )}
            </div>

            <div>
                <label htmlFor='backgroundImage'>Image</label>
                <input type='text' value={input.backgroundImage} name='backgroundImage' onChange={(e) => handleChange(e)} />
                {errors.backgroundImage && (
                    <p className="error">{errors.backgroundImage}</p>
                )}
            </div>
            

            <BlankCheckboxInput
                attribute={'Genres'}
                attributeSet={allGenres}
                handler={handleCheckGenres}
                />
                
                {errors.genres && (
                    <p className="error">{errors.genres}</p>
                )}


            <BlankCheckboxInput
                attribute={'Platforms'}
                attributeSet={allPlatforms}
                handler={handleCheckPlatforms}
            />
            {errors.platforms && (
                    <p className="error">{errors.platforms}</p>
                )}

            <button type='submit' >Add New Videogame</button>
        </form>

        </main>
    )
}