import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchVidyaByName } from "../redux/actions/actions";

export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmitVidyaName(e){
        e.preventDefault();
        dispatch(fetchVidyaByName(name))
        setCurrentPage(1);
        setName('')
    }

    return (
        <div>
            <input type='text' placeholder="Search Videogame" value={name} onChange={(e) => handleInputChange(e)} />
            <button type='submit' onClick={(e) => handleSubmitVidyaName(e)} >OK</button>
        </div>
    )
}