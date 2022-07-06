import React from "react";

export default function BlankCheckboxInput({attribute, attributeSet, handler}){
    return(
        <div>
            <label htmlFor={attribute}>{attribute}</label><br/>
            {attributeSet.map(e => {
                return(
                    <>
                    <label htmlFor={e.name}>{e.name}</label>
                    <input type='checkbox' name={e.name} value={e.name} key={e.id} onChange={e => handler(e)} />
                    </>
                )
            })}
        </div>
    )

}