import React from "react";
import {Link } from "react-router-dom";


const HomePage = ({currentUser}) => {
    if(!currentUser.isAuthenticated){
    return(
        <div className= "home-hero">
            <h2>How Uuu Doiin?</h2>
            <h2>New to Gabler?</h2>
            <Link to = "/signup" className ="btn btn-primary">
                Sign Up Here
            </Link>
        </div>

    )
    
}
return (<div><h1>Welcome back</h1></div>)
    }

export default HomePage;