import React, { useEffect, useState } from 'react';
import VideoPlayer from '../../components/video/VideoPlayer';

function TestPage() {
  const videoUrl = 'http://localhost:4000/videos/cat-of-the-day';

  return (
    <div>
      <h1>Video Stream</h1>
      <VideoPlayer videoSrc={videoUrl} />
    </div>
  );
}

export default TestPage;
