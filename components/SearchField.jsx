import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchField = ({ fetchVideoData }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const extractUrl = () => {
    const videoId = videoUrl.split("v=")[1].split("&")[0];
    console.log(videoId);
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${videoId}&key=${api_key}`
      )
      .then((response) => {
        fetchVideoData(response.data.items[0]);
      });
  };
  return (
    <div className="flex items-center mt-4 space-x-3 bg-[#ccc]">
      <input
        type="search"
        name="videourl"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Paste YouTube url here..."
        className="w-full text-[#000] placeholder:text-[#404040] border-none outline-none py-1 px-3 bg-transparent rounded-md"
      />
      <button
        className="text-[#000] border-none outline-none px-3 text-[14px]"
        onClick={extractUrl}
      >
        Extract
      </button>
    </div>
  );
};

export default SearchField;
