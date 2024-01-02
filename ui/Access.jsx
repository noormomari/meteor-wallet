import React, { useState } from "react";
import { Accounts } from 'meteor/accounts-base'
import { RoutePaths } from "./RoutePaths";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "./components/ErrorAlert";

export const Access = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState();

    const signUp = (e) => {
        e.preventDefault();

        Accounts.createUser(
            { email, password },
            (err) => {
                if(err){
                    console.log('Error Creating User', err);
                    setError(err);
                    return;
                }
                navigate(RoutePaths.HOME);
            }
        );
    }
    
    const signIn = (e) => {
        e.preventDefault();

        Meteor.loginWithPassword( email, password,
            (err) => {
                if(err){
                    console.log('Error signing in', err);
                    setError(err);
                    return;
                }
                navigate(RoutePaths.HOME);
            }
        );
    }

    return (
        <div className="flex flex-col items-center mt-3">
            <h3 className="px-3 py-2 text-lg font-medium ">{isSignUp ? 'Sign Up' : 'Sign In'}</h3>
            <form className="mt-4" style={{minWidth : '220px'}}>
                <div className='mb-2'>
                    {error && <ErrorAlert message={error.reason || 'Unknown Error'} />}
                    {/* {success && <SuccessAlert message={success} /> } */}
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                </div>
                <div className="px-2 py-3">
                    <div className="flex justify-center space-x-3">
                        <button onClick={()=> navigate(RoutePaths.HOME)} type="button" 
                            className="bg-white border border-gray-400 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            >Cancel
                        </button>
                        {isSignUp ?
                            <button onClick={signUp} type="button" 
                                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                >Sign up
                            </button>
                            :
                            <button onClick={signIn} type="button" 
                                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                >Sign In
                            </button>
                        }
                    </div>
                </div>
                <div className="py-3">
                    <a className="text-indigo-600 cursor-pointer" onClick={()=> setIsSignUp(!isSignUp)}>
                        {
                            isSignUp ? 
                            'If you already have an account, click here' : 
                            'If you do not have an account, click here '
                        }
                        
                    </a>
                </div>
                {!isSignUp && (<div className="pb-3">
                    <a className="text-indigo-600 cursor-pointer" onClick={()=> navigate(RoutePaths.FORGOT_PASSWORD)}>
                        Forgot password?
                    </a>
                </div>)}
            </form>
        </div>
    );
}