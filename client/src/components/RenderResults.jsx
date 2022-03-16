import React from 'react'
import ReactPlayer from 'react-player';

const RenderResults = ({ scrapedData, location }) => {
    switch (location) {
        case '/search':
            return (
                <div className="sm:px-56 flex flex-wrap justify-between space-y-6" >
                    {
                        scrapedData.map(({ link, title }, index) => {
                            return (
                                <div key={index} className="md:w-2/5 w-full" >
                                    <a href={link?.slice(7)} target="_blank" rel="noreferrer">
                                        {/* <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p>
                                    {console.log(link.slice(7))} */}
                                        <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{title}</p>
                                    </a>
                                </div>
                            )
                        })
                    }
                </ div>
            )
        case '/news':
            return (
                <div className="sm:px-56 flex flex-wrap justify-between space-y-6" >
                    {scrapedData?.map(({ description, url }, index) => {
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
                </div >

            )
        case '/videos':
            return (
                <div className="flex flex-wrap ">
                    {scrapedData?.map(({ url }, index) => {
                        return (
                            <div key={index} className="p-2">
                                {console.log(url)}
                                <ReactPlayer url={`https://www.youtube.com${url}`} controls width="355px" height="200px" />
                            </div>
                        )
                    })}
                </div>
            )
    }
}

export default RenderResults