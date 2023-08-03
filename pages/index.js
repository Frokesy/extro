import SearchField from '@/components/SearchField'
import React from 'react'

const Home = () => {

  const fetchVideoData = async (videoData) => {
    console.log(videoData)
  }

  return (
    <div className="w-[70vw] mx-auto mt-4">
      <h2 className="text-center font-mono font-bold text-[24px]">Extro</h2>
      <SearchField fetchVideoData={fetchVideoData} />
      
    </div>
  )
}

export default Home
