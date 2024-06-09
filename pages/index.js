import SearchField from '@/components/SearchField'
import VideoContainer from '@/components/VideoContainer'
import React, { useState } from 'react'

const Home = () => {
  const [videoData, setVideoData] = useState(null)
  const [videoUrl, setVideoUrl] = useState("")

  const fetchVideoData = async (videoData) => {
    setVideoData(videoData)
  }

  const fetchVideoUrl = async (videoUrl) => {
    setVideoUrl(videoUrl)
  }
  return (
    <div className="w-[70vw] mx-auto mt-4">
      <h2 className="text-center font-mono font-bold text-[24px]">Extro</h2>
      <SearchField fetchVideoData={fetchVideoData} fetchVideoUrl={fetchVideoUrl} />
      <VideoContainer videoData={videoData} videoUrl={videoUrl} />
    </div>
  )
}

export default Home
