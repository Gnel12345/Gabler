import React from "react";
import {Link } from "react-router-dom";


const HomePage = () => (
    
        <div className= "home-hero">
            <h2>How Uuu Doiin?</h2>
            <h2>New to Gabler?</h2>
            <Link to = "/signup" className ="btn btn-primary">
                Sign Up Here
            </Link>
        </div>
    
)

export default HomePage;