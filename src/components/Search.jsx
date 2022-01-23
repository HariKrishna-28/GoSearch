import React, { useRef } from 'react';
import Links from './Links';
import { useStateContext } from '../contexts/StateContextProvider';

const Search = () => {
    const searchRef = useRef()
    const { setSearchTerm } = useStateContext()

    return (
        <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
            <input
                type="text"
                className="sm:w-96 w-80 h-10 dark:bg-gray-200 border
                 rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
                placeholder="search or type URL"
                ref={searchRef}
            />
            <button
                type="button"
                className="absolute top-1.5 right-4 text-2xl text-gray-500"
                onClick={() => {
                    if (!searchRef.current.value) return
                    setSearchTerm(searchRef.current.value)
                    searchRef.current.value = ""
                }}
            >
                🔎
            </button>
            <Links />
        </div>
    )
};

export default Search;
