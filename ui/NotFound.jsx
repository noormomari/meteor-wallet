import React from "react";
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return ( 
        <div className="flex flex-col items-center">
            <h3 className="px-3 py-2 text-lg font-medium ">Page Not Found</h3>
            <button onClick={()=> navigate(RoutePaths.HOME)} type="button" 
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >Go Home
            </button>
        </div>
    );
};