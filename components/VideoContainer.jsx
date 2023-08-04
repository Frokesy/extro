import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VideoContainer = ({ videoData }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const[downloadUrl, setDownloadUrl] = useState("")

  const convertVideoToAudio = async () => {
    setMessage("processing");
    const options = {
      method: "GET",
      url: "https://youtube-mp3-download1.p.rapidapi.com/dl",
      params: { id: videoData?.id },
      headers: {
        "X-RapidAPI-Key": "2bb776606amshe09eeea19a38a9bp121fddjsn0011f31c8f3a",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      if (response.data.status === "ok") {
        setMessage("ok");
        setDownloadUrl(response.data.link)
      } else if (response.data.status === "processing") {
        setMessage("Processing");
        setProgress(response.data.progress, "%");
      } else if (response.data.status === "fail") {
        setMessage("Error");
        setError(response.data.msg);
      } 
    } catch (error) {
      console.error(error);
    }
  };

  const timeString = videoData?.contentDetails.duration;

  function convertTimeToReadableFormat(timeString) {
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const matches = timeString?.match(regex);

    if (!matches) {
      return timeString;
    }

    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
    const seconds = parseInt(matches[3]) || 0;

    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return time;
  }

  const readableTime = convertTimeToReadableFormat(timeString);
  useEffect(() => {
    if (progress === 100) {
      setMessage("ok");
    } else {
      console.log(progress);
    }
  }, [progress])

  return (
    <div>
      {videoData && (
        <div className="flex items-center space-x-4 mt-4 w-[60vw]">
          <img
            src={videoData.snippet.thumbnails.medium.url}
            alt="img"
            className="scale-75"
          />
          <div className="">
            <h3 className="text-[#fff] font-bold text-[18px]">
              {videoData.snippet.title}
            </h3>
            <div className="flex justify-between pt-3">
              <p className="text-[#fff] text-[13px]">
                Duration: {readableTime}
              </p>
              {message === "ok" & message !== "Error" ? (
                <button
                  className="bg-green-600 font-bold text-[13px] px-4 py-1 rounded-md"
                >
                  <Link href={downloadUrl}>
                    Download
                  </Link>
                </button>
              ) : (
                <button
                  onClick={() => convertVideoToAudio()}
                  className="bg-green-600 font-bold text-[13px] px-4 py-1 rounded-md"
                >
                  {(message == "processing")
                    ? `Processing ${progress}%`
                    : "Convert"}
                </button>
              )}
            </div>
          {error && (
            <p className="text-red-500 text-[13px] pt-2">{error}</p>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
