import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useStateContext } from '../contexts/StateContextProvider';
import { ScaleLoader } from 'react-spinners';
import RenderResults from './RenderResults';

export const Results = () => {
    const { state, loading, getResults, searchTerm, darkTheme, setLoading } = useStateContext();
    const location = useLocation();
    console.log(state.scrapedData);
    console.log(loading)
    const [internalLoad, setInteralLoad] = useState(false)

    useEffect(() => {
        // setLoading(false)
        if (searchTerm !== '') {
            const prevData = state.scrapedData
            if (location.pathname === '/videos') {
                getResults(`/search/q=${searchTerm} videos`);

            } else {
                getResults(`${location.pathname}/q=${searchTerm}&num=40`);
            }
            if (prevData !== state.scrapedData) setInteralLoad(false)
        }
        // eslint-disable-next-line
    }, [searchTerm, location.pathname]);

    useEffect(() => {
        console.log("hi")
        setInteralLoad(true)
        // setLoading(true)
    }, [location.pathname])

    if (loading) return <div className="flex items-center justify-center" style={{ marginTop: "15%" }}><ScaleLoader color={darkTheme ? "rgb(29 78 216)" : "black"} /></div>
    if (!searchTerm) {
        return (
            <div className="flex flex-col justify-center items-center text-2xl h-screen">
                Search Something
            </div>
        )
    }

    return (
        !internalLoad &&
        // <RenderResults location={location.pathname} scrapedData={state.scrapedData} />
        <RenderResults location={location.pathname} scrapedData={[]} />
    )

    switch (location.pathname) {
        case '/search':
            return (
                <>
                    {/* <h1>hi</h1> */}
                    {!internalLoad && (
                        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
                            {state.scrapedData.map(({ link, title }, index) => {
                                return (
                                    <div key={index} className="md:w-2/5 w-full">
                                        <a href={link} target="_blank" rel="noreferrer">
                                            <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p>
                                            <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{title}</p>
                                        </a>
                                    </div>
                                )
                            })}
                        </div >
                    )}
                </>
            );
        case '/images':
            return (
                <>
                // <h1>IMAGES</h1>
                    {!internalLoad &&
                        <div className="flex flex-wrap justify-center items-center">
                            {state.scrapedData.map(({ description, url }, index) => {
                                return (
                                    <div key={index} className="md:w-2/5 w-full" >
                                        <a href={url?.slice(7)} target="_blank" rel="noreferrer">
                                            {/* <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p> */}
                                            {/* {console.log(link.slice(7))} */}
                                            <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{description}</p>
                                        </a>
                                    </div>
                                )
                            })
                            }
                        </div>

                    }
                </>
            );
        case '/news':
            return (
                <h1>NEWS</h1>

                // <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
                //     {/* {console.log(results)} */}
                //     {results?.entries?.map(({ id, links, source, title }) => {
                //         return (
                //             <div key={id} className="md:w-2/5 w-full ">
                //                 <a href={links?.[0].href} target="_blank" rel="noreferrer " className="hover:underline ">
                //                     <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
                //                 </a>
                //                 <div className="flex gap-4">
                //                     <a href={source?.href} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300"> {source?.href}</a>
                //                 </div>
                //             </div>
                //         )
                //     })}
                // </div>
            );
        case '/videos':
            return (
                <h1>hi</h1>

                // <div className="flex flex-wrap ">
                //     {results?.results?.map((video, index) => {
                //         return (
                //             <div key={index} className="p-2">
                //                 {video?.additional_links?.[0]?.href && <ReactPlayer url={video.additional_links?.[0].href} controls width="355px" height="200px" />
                //                 }
                //             </div>
                //         )
                //     })}
                // </div>
            );
        default:
            return 'Error...';
    }
};