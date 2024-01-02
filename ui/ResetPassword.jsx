import React, { useState } from "react";
import { Accounts } from 'meteor/accounts-base'
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from 'meteor/quave:alert-react-tailwind';

import { RoutePaths } from "./RoutePaths";
import { ErrorAlert } from "./components/ErrorAlert";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const { openAlert } = useAlert();
    const { token } = useParams();
    const [password, setPassword] = useState('')
    const [error, setError] = useState();

    const resetPassword = (e) => {
        e.preventDefault();
        console.log('token:', token);
        Accounts.resetPassword(token, password,
            (err) => {
                if(err){
                    console.log('Error trying to reset password', err);
                    setError(err);
                    return;
                }
                setPassword('');
                setError(null);
                openAlert('Your new password is set, please sign in!');
                navigate(RoutePaths.ACCESS);
            }
        );
    }

    return (
        <div className="flex flex-col items-center mt-3">
            <h3 className="px-3 py-2 text-lg font-medium ">Reset your password</h3>
            <form className="mt-4" style={{minWidth : '220px'}}>
                <div className='mb-2'>
                    {error && <ErrorAlert message={error.reason || 'Unknown Error'} />}
                </div>
                <div className="flex flex-col space-y-4">
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
                            >Back to Home
                        </button>
                        <button onClick={resetPassword} type="button" 
                            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            >Set new password
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}