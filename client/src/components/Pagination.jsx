import React from "react";

export default function Pagination({vidyasPerPage, totalVidyas, pages}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalVidyas/vidyasPerPage); i++){
        pageNumbers.push(i);
    }

    return (
            <nav>
                <ul className="pagination">
                    {pageNumbers?.map(number => (
                            <li className="page-item" key={number}>
                                <a href="#!" className="page-link" onClick={() => pages(number)}> {number} </a>
                            </li>
                    ))}
                </ul>
            </nav>
        
    )
}