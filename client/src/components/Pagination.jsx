import React from "react";

export default function Pagination({vidyasPerPage, totalVidyas, pages}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalVidyas/vidyasPerPage); i++){
        pageNumbers.push(i);
    }

    return (
            <nav>
                <ul>
                    {pageNumbers?.map(number => (
                            <li key={number}>
                                <button onClick={() => pages(number)}> {number} </button>
                            </li>
                    ))}
                </ul>
            </nav>
        
    )
}