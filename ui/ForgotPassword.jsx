import React, { useState } from "react";
import { Accounts } from 'meteor/accounts-base'
import { useNavigate } from "react-router-dom";
import { useAlert } from 'meteor/quave:alert-react-tailwind';

import { RoutePaths } from "./RoutePaths";
import { ErrorAlert } from "./components/ErrorAlert";

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const { openAlert } = useAlert();
    const [email, setEmail] = useState('')
    const [error, setError] = useState();

    const forgotPassword = (e) => {
        e.preventDefault();

        Accounts.forgotPassword(
            { email },
            (err) => {
                if(err){
                    console.log('Error requesting reset password link', err);
                    setError(err);
                    return;
                }
                setEmail('');
                setError(null);
                openAlert('You should receive a reset email shortly!');

               // navigate(RoutePaths.HOME);
            }
        );
    }

    return (
        <div className="flex flex-col items-center mt-3">
            <h3 className="px-3 py-2 text-lg font-medium ">Forgot password</h3>
            <form className="mt-4" style={{minWidth : '220px'}}>
                <div className='mb-2'>
                    {error && <ErrorAlert message={error.reason || 'Unknown Error'} />}
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
                </div>
                <div className="px-2 py-3">
                    <div className="flex justify-center space-x-3">
                        <button onClick={()=> navigate(RoutePaths.ACCESS)} type="button" 
                            className="bg-white border border-gray-400 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            >Back to access
                        </button>
                        <button onClick={forgotPassword} type="button" 
                            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            >Send reset password link
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}