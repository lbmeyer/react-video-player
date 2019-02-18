import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Video from '../Video';
import Playlist from './Playlist';
import StyledVideoPlayer from '../styles/StyledVideoPlayer';
import data from '../../data';

const theme = {
  bgcolor: '#353535',
  bgcolorItem: '#414141',
  bgcolorItemActive: '#405c63',
  bgcolorPlayed: '#526d4e',
  border: 'none',
  borderPlayed: 'none',
  color: '#fff'
};

const themeLight = {
  bgcolor: '#fff',
  bgcolorItem: '#fff',
  bgcolorItemActive: '#80a7b1',
  bgcolorPlayed: '#7d9979',
  border: '1px solid #353535',
  borderPlayed: 'none',
  color: '#353535'
};

const VideoPlayer = props => {
  // const videos = JSON.parse(document.querySelector('[name="videos"]').value);
  const videos = data;

  // Retrieve state from LS
  const savedState = JSON.parse(localStorage.getItem(`${videos.playlistId}`));

  const [state, setState] = useState({
    videos: savedState ? savedState.videos : videos.playlist,
    activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
    nightMode: savedState ? savedState.nightMode : true,
    playlistId: savedState ? savedState.playlistId : videos.playlistId,
    autoplay: false
  });

  // Set state to LS on state change
  useEffect(() => {
    localStorage.setItem(`${state.playlistId}`, JSON.stringify({ ...state }));
  }, [state]);

  useEffect(() => {
    const videoId = props.match.params.activeVideo;
    // if not undefined we have a :/
    if (videoId !== undefined) {
      const newActiveVideo = state.videos.findIndex(
        video => video.id === videoId
      );

      setState({
        ...state,
        activeVideo: state.videos[newActiveVideo],
        autoplay: props.location.autoplay
      });
    } else {
      props.history.push({
        pathname: `/${state.activeVideo.id}`,
        autoplay: false
      });
    }
  }, [props.match.params.activeVideo]);

  const nightModeCallback = () => {
    setState(prevState => ({
      ...prevState,
      nightMode: !prevState.nightMode
    }));
  };

  const endCallback = () => {
    const videoId = props.match.params.activeVideo;
    const currentVideoIndex = state.videos.findIndex(
      video => video.id === videoId
    );

    // if current index is at the end, start at beginning [0]. Else play next video
    const nextVideo =
      currentVideoIndex === state.videos.length - 1 ? 0 : currentVideoIndex + 1;

    props.history.push({
      pathname: `${state.videos[nextVideo].id}`,
      autoplay: false
    });
  };

  // Apply played: true if video has played for more than 10 secs
  const progressCallback = e => {
    if (e.playedSeconds > 10 && e.playedSeconds < 11) {
      setState(prevState => ({
        ...prevState,
        videos: state.videos.map(el => {
          return el.id === state.activeVideo.id
            ? { ...el, played: true } // clone video el then set played property to true
            : el;
        })
      }));

      // Method #2 -->
      // const videos = [...state.videos];
      // const playedVideo = videos.find(
      //   video => video.id === state.activeVideo.id
      // );

      // playedVideo.played = true;

      // setState(prevState => ({
      //   ...prevState, videos
      // }));
    }
  };

  return (
    <ThemeProvider theme={state.nightMode ? theme : themeLight}>
      {state.videos !== null ? (
        <StyledVideoPlayer>
          <Video
            active={state.activeVideo}
            autoplay={state.autoplay}
            endCallback={endCallback}
            progressCallback={progressCallback}
          />
          <Playlist
            videos={state.videos}
            active={state.activeVideo}
            nightModeCallback={nightModeCallback}
            nightMode={state.nightMode}
          />
        </StyledVideoPlayer>
      ) : null}
    </ThemeProvider>
  );
};

export default VideoPlayer;
