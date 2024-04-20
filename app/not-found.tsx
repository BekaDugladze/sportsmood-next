import React from "react";

export default () => {
    return(
        <div className="w-screen h-screen text-center flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col">
                <iframe src="https://giphy.com/embed/toXKzaJP3WIgM" width="400" height="200" frameBorder="0" 
                className="giphy-embed" allowFullScreen></iframe>
                <p>
                    <a href="https://giphy.com/gifs/toXKzaJP3WIgM" style={{fontSize: '8px'}}>via GIPHY</a>
                </p>
            </div>
            <h1 className="text-red-700 font-bold">Not Found!</h1>
            <p>sorry this page is not found yet, but I am working!</p>
            <h2>Come back soon!</h2>
        </div>
    )
}