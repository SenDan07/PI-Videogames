import React from "react";
import styled from 'styled-components'

export default function BlankCheckboxInput({attribute, attributeSet, handler}){
    const CheckHeader = styled.h3`
    margin: 5px;
    `
    return(
        <div>
            <CheckHeader htmlFor={attribute}>{attribute}</CheckHeader><br/>
            {attributeSet.map(e => {
                return(
                    <div>
                    <label htmlFor={e.name}>{e.name}</label>
                    <input type='checkbox' name={e.name} value={e.name} key={e.id} onChange={e => handler(e)} />
                    </div>

                )
            })}
        </div>
    )

}