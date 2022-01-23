import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const NavBar = ({ darkTheme, setDarkTheme }) => {
    return (
        <div
            className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center  items-center 
        border-b dark:border-gray-700 border-gray-200 ">
            <div
                className="flex justify-between items-center space-x-5 w-screen ">
                <Link to="/">
                    <p
                        className="text-2xl text-blue-500 font-bold  py-1 px-2 rounded 
                    ">
                        GoSearch
                    </p>
                </Link>
                <button
                    type="button"
                    onClick={() => setDarkTheme(!darkTheme)}
                    className="text-xl font-semibold dark:bg-blue-500 dark:text-gray-900 bg-white border dark:border-none rounded-full 
                    px-2 py-1 hover:shadow-lg ">
                    {darkTheme ? '💡 Light' : '🌙 Dark'}</button>
            </div>
            <Search />
        </div>
    )
}

export default NavBar
