import React from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return(
        <div>
            <h1>我がのゲームのウェブサイトへようこそ！</h1>
            <Link to='/home'>
                <button>Learn more</button>
            </Link>
        </div>
    )
}