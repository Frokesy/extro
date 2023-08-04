import SearchField from '@/components/SearchField'
import VideoContainer from '@/components/VideoContainer'
import React, { useState } from 'react'

const Home = () => {
  const [videoData, setVideoData] = useState(null)

  const fetchVideoData = async (videoData) => {
    setVideoData(videoData)
  }

  return (
    <div className="w-[70vw] mx-auto mt-4">
      <h2 className="text-center font-mono font-bold text-[24px]">Extro</h2>
      <SearchField fetchVideoData={fetchVideoData} />
      <VideoContainer videoData={videoData} />
    </div>
  )
}

export default Home
