import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { useLoggedUser } from 'meteor/quave:logged-user-react';

export const Header = () => {
  const navigate = useNavigate();
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();

  return (
    <header className="bg-indigo-600">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center justify-between grow">
            <div>
              <a className='cursor-pointer' onClick={() => navigate(RoutePaths.HOME)}>
                <span className="sr-only">Meteor Wallet</span>
                <img
                  className="h-10 w-auto"
                  src="/images/logo.png"
                  alt="Meteor logo"
                />
              </a>
            </div>
            {!isLoadingLoggedUser && !loggedUser && 
              <div>
                <button className='text-white font-bold' onClick={()=> navigate(RoutePaths.ACCESS)}>Sign Up</button>
              </div>
            }
             {!isLoadingLoggedUser && loggedUser && 
              <div>
                <button className='text-white font-bold' onClick={()=> Meteor.logout()}>Log Out</button>
              </div>
            }
          </div>
        </div>
      </nav>
    </header>
  )
}