import React from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux"
import HomePage from "../components/HomePage";
import AuthForm from "../components/AuthForm";
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/errors";



const Main = props => {
    const {authUser, errors, removeError, currentUser} = props;
    return(
        <div className ="container">
            <Switch>
                <Route exact path = "/" render = {props => <HomePage currentUser={currentUser} {...props} />}></Route>
                    <Route exact path ="/signin" render = {props =>{
                            return(
                                <AuthForm 
                                removeError = {removeError}
                                errors = {errors}
                                onAuth = {authUser}
                                 buttonText="Log In"
                                  heading="Welcome Back"{...props}/>
                            )
                    } }></Route>
                    <Route exact path ="/signup" render = {props =>{
                            return(
                                <AuthForm 
                                removeError={removeError}
                                errors={errors}
                                 onAuth = {authUser}
                                  signUp 
                                  buttonText="Sign Up" 
                                  heading="Join Gabler"{...props}/>
                            )
                    } }></Route>


               
            </Switch>
        </div>
    )
}

function mapStateToProps(state){
    return{
        currentUser:state.currentUser,
        errors:state.errors
    }
}

export default withRouter(connect(mapStateToProps,{authUser, removeError})(Main));