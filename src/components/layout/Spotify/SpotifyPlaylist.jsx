"use client";
import React from "react";

const SpotifyPlaylist = () => {
  return (
    <div className="w-full">
      <h2 className="mt-10 mb-5 text-2xl font-medium">My Spotify Playlist</h2>
      <div className="border-t-2 border-black mb-4"></div>
      <p className="text-gray-700 dark:text-gray-300">
        Music I listened to while coding this application
      </p>
      <div className="w-full mt-10 mb-20">
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/3rRMSaQGXezre7OUJnqrXy?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default SpotifyPlaylist;
