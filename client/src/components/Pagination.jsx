import React from "react";
import styled from "styled-components";

export default function Pagination({vidyasPerPage, totalVidyas, pages}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalVidyas/vidyasPerPage); i++){
        pageNumbers.push(i);
    }
    const Pagesli = styled.li`
    display: inline-block;
    padding: 10px;
    `

    return (
            <nav>
                <ul className="pagination">
                    {pageNumbers?.map(number => (
                            <Pagesli className="page-item" key={number}>
                                <a href="#!" className="page-link" onClick={() => pages(number)}> {number} </a>
                            </Pagesli>
                    ))}
                </ul>
            </nav>
        
    )
}