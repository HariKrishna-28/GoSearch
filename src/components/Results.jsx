import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useStateContext } from '../contexts/StateContextProvider';
import { ScaleLoader } from 'react-spinners';

export const Results = () => {
    const { results, loading, getResults, searchTerm, darkTheme } = useStateContext();
    const location = useLocation();

    useEffect(() => {
        if (searchTerm !== '') {
            if (location.pathname === '/videos') {
                getResults(`/search/q=${searchTerm} videos`);
            } else {
                getResults(`${location.pathname}/q=${searchTerm}&num=40`);
            }
        }
        // eslint-disable-next-line
    }, [searchTerm, location.pathname]);

    if (loading) return <div className="flex items-center justify-center "><ScaleLoader color={darkTheme ? "rgb(29 78 216)" : "black"} /></div>
    if (!searchTerm) {
        return (
            <div className="flex flex-col justify-center items-center text-2xl h-screen">
                Search Something
            </div>
        )
    }

    // !searchTerm && (

    // )


    switch (location.pathname) {
        case '/search':
            return (
                <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
                    {results?.results?.map(({ link, title }, index) => {
                        return (
                            <div key={index} className="md:w-2/5 w-full">
                                <a href={link} target="_blank" rel="noreferrer">
                                    <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p>
                                    <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{title}</p>
                                </a>
                            </div>
                        )
                    })}
                </div>
            );
        case '/images':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results?.image_results?.map(({ image, link: { href, title } }, index) => {
                        return (
                            <a href={href} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
                                <img src={image?.src} alt={title} loading="lazy" />
                                <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
                            </a>
                        )
                    })}
                </div>
            );
        case '/news':
            return (
                <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
                    {/* {console.log(results)} */}
                    {results?.entries?.map(({ id, links, source, title }) => {
                        return (
                            <div key={id} className="md:w-2/5 w-full ">
                                <a href={links?.[0].href} target="_blank" rel="noreferrer " className="hover:underline ">
                                    <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
                                </a>
                                <div className="flex gap-4">
                                    <a href={source?.href} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300"> {source?.href}</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            );
        case '/videos':
            return (
                <div className="flex flex-wrap ">
                    {results?.results?.map((video, index) => {
                        return (
                            <div key={index} className="p-2">
                                {video?.additional_links?.[0]?.href && <ReactPlayer url={video.additional_links?.[0].href} controls width="355px" height="200px" />
                                }
                            </div>
                        )
                    })}
                </div>
            );
        default:
            return 'Error...';
    }
};
