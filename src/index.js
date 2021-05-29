import React from 'react';
import ReactDOM from 'react-dom';
import VideoPLayer from './videoPlayer/player'
ReactDOM.render(
  <VideoPLayer videoURL={"https://www.w3schools.com/html/mov_bbb.mp4"} videoSUB={"/subtitle.vtt"} />
  ,
  document.getElementById('root')
);
