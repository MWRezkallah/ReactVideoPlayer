import React from 'react';
import ReactDOM from 'react-dom';
import VideoPage from './videoPage/videoPage'
ReactDOM.render(
    <VideoPage userToken={"96f9b2d284736782e7b3b12f9e7010916fbf4027"} backendURL={"http://itinetflixapi.herokuapp.com/"} showID={"1"} />
,
  document.getElementById('root')
);
