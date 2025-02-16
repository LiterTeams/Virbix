"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MusicContext: () => MusicContext,
  MusicProvider: () => MusicProvider,
  VirbixPlayer: () => VirbixPlayer,
  useMusic: () => useMusic
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useMusic.ts
var import_react = require("react");
var useMusic = () => {
  const context = (0, import_react.useContext)(MusicContext);
  if (!context) throw new Error("useMusic must be used within a <MusicProvider>");
  return context;
};

// src/ui/MusicProvider.tsx
var import_react9 = require("react");

// src/hooks/usePlayerState.ts
var import_react2 = require("react");
var usePlayerState = ({ loop = false, mute = false, volume = 0.25 } = {}) => {
  const [trackInfo, setTrackInfo] = (0, import_react2.useState)({ name: "Unknown" });
  const [state, setState] = (0, import_react2.useState)({
    source: null,
    volume,
    currentTime: 0,
    totalTime: 0,
    error: null,
    isError: false,
    isPlaying: false,
    isLoading: true,
    isEnded: false,
    isLooped: loop,
    isMuted: mute
  });
  const setPlayerState = (0, import_react2.useCallback)(
    (newState) => setState((prev) => ({ ...prev, ...newState })),
    []
  );
  const handleError = (0, import_react2.useCallback)((event) => {
    event.preventDefault();
    setPlayerState({ isError: event.isTrusted, error: event.type });
  }, [setPlayerState]);
  const updateTrackInfo = (0, import_react2.useCallback)((trackDataInfo) => {
    if (!trackDataInfo) return;
    setTrackInfo((prev) => ({ ...prev, ...trackDataInfo }));
  }, []);
  return {
    ...state,
    trackInfo,
    // trackList,
    // currentTrackIndex,
    setPlayerState,
    updateTrackInfo,
    handleError
    // playPrevTrack,
    // playNextTrack,
  };
};

// src/hooks/usePlayerPlayback.ts
var usePlayerPlayback = ({
  audioRef,
  isError,
  isLooped,
  isMuted,
  totalTime,
  source,
  volume,
  isClose,
  startAnimation,
  stopAnimation,
  skipTime,
  updateTrackInfo,
  setPlayerState,
  toggleClose
}) => {
  const withAudioRef = (fn) => {
    return function(...args) {
      const audio = audioRef.current;
      if (!audio || isError) return;
      return fn.apply(audio, args);
    };
  };
  const handleTimeUpdate = withAudioRef(function() {
    const currentTime = this.currentTime;
    setPlayerState({ currentTime });
    if (this.ended || Math.abs(currentTime - totalTime) < 0.1) {
      handleEnded();
      return;
    }
    setPlayerState({ isEnded: false });
  });
  const handleLoadedMetadata = withAudioRef(function() {
    setPlayerState({ totalTime: this.duration, isLoading: false });
  });
  const handleForwardSkip = () => skipTime("forward");
  const handleBackwardSkip = () => skipTime("backward");
  const toggleMute = () => setPlayerState({ isMuted: !isMuted });
  const toggleLoop = () => setPlayerState({ isLooped: !isLooped });
  const handlePlay = withAudioRef(function() {
    this.play();
    if (isClose) toggleClose();
    setPlayerState({ isPlaying: true });
    startAnimation();
  });
  const handlePause = withAudioRef(function() {
    this.pause();
    setPlayerState({ isPlaying: false });
    stopAnimation();
  });
  const setAudioSrc = withAudioRef(async function(url, trackInfo) {
    if (!url) return;
    this.src = url;
    this.load();
    this.volume = volume;
    setPlayerState({ source: url });
    if (trackInfo) updateTrackInfo(trackInfo);
    setPlayerState({ isLoading: true });
    this.onloadedmetadata = () => {
      setPlayerState({ totalTime: audioRef.current.duration, isLoading: false });
      handlePlay();
    };
  });
  const handleTogglePlay = withAudioRef(function(url, trackInfo) {
    if (url && (!source || source !== url)) {
      setAudioSrc(url, trackInfo);
      return;
    }
    if (this.paused) {
      handlePlay();
      return;
    }
    handlePause();
  });
  const handleEnded = () => {
    if (isError) return;
    setPlayerState({ isPlaying: false, isEnded: true });
    stopAnimation();
  };
  const handleRepeat = () => {
    if (!audioRef.current || isError) return;
    audioRef.current.currentTime = 0;
    handlePlay();
  };
  const handleVolumeChange = withAudioRef(function(newVolume) {
    setPlayerState({ volume: newVolume });
    this.volume = newVolume;
  });
  const handleToggleClose = withAudioRef(function() {
    handlePause();
    toggleClose();
  });
  const onSeek = withAudioRef(function(time) {
    this.currentTime = time;
  });
  return {
    handleTogglePlay,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleRepeat,
    handleForwardSkip,
    handleBackwardSkip,
    handleVolumeChange,
    handleToggleClose,
    toggleMute,
    toggleLoop,
    onSeek
  };
};

// src/hooks/useTimeline.ts
var import_react3 = require("react");

// src/helpers/parseTime.ts
var parseTime = (time) => {
  const match = time.match(/(\d+)([smh]?)/);
  if (!match) return 0;
  const value = parseInt(match[1], 10);
  return match[2] === "m" ? match[3] === "h" ? value * 60 ** 2 : value * 60 : value;
};

// src/helpers/durationFormat.ts
var durationFormat = (duration) => {
  const totalMinutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours >= 10 ? hours : "0" + hours}:${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
};

// src/hooks/useTimeline.ts
var useTimeline = ({ audioRef, timeSkip = "15s" }) => {
  const skip = parseTime(timeSkip);
  const [progress, setProgress] = (0, import_react3.useState)(0);
  const animationRef = (0, import_react3.useRef)(null);
  const updateProgress = () => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress(currentTime / duration * 100);
    animationRef.current = requestAnimationFrame(updateProgress);
  };
  const startAnimation = () => {
    if (!audioRef.current) return;
    animationRef.current = requestAnimationFrame(updateProgress);
  };
  const stopAnimation = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };
  const skipTime = (direction) => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;
    const currentDuration = audioRef.current.duration;
    const newTime = currentTime + (direction === "forward" ? skip : -skip);
    audioRef.current.currentTime = Math.max(0, Math.min(currentDuration, newTime));
  };
  (0, import_react3.useEffect)(() => {
    return () => stopAnimation();
  }, []);
  return { progress, startAnimation, stopAnimation, skipTime };
};

// src/hooks/usePlayerUI.ts
var import_react4 = require("react");
var usePlayerUI = () => {
  const [isCollapse, setIsCollapse] = (0, import_react4.useState)(false);
  const [isClose, setIsClose] = (0, import_react4.useState)(true);
  const toggleCollapse = () => {
    setIsCollapse((prev) => !prev);
    setIsClose(false);
  };
  const toggleClose = () => {
    setIsClose((prev) => !prev);
    setIsCollapse(false);
  };
  return {
    isCollapse,
    toggleCollapse,
    isClose,
    toggleClose
  };
};

// src/hooks/usePlayerVFX.ts
var import_react5 = require("react");
var usePlayerVFX = ({ ambientMode = false } = {}) => {
  const [useAmbientMode, setAmbientMode] = (0, import_react5.useState)(ambientMode);
  const toggleAmbientMode = () => setAmbientMode((prev) => !prev);
  return {
    useAmbientMode,
    toggleAmbientMode
  };
};

// src/ui/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = ({ className, children, label, active = false, ...props }) => {
  const btnClassName = `flex items-center justify-center rounded-md size-9 p-1 bg-black/25 border border-white border-opacity-15 duration-300 hover:bg-white/25 ${active && "bg-white/25"} ${className}`;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: btnClassName, ...props, children: children ?? label });
};

// src/ui/Overlay.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Overlay = ({ className, children }) => {
  const styles = className ? className.includes("pointer-events") ? className : `pointer-events-auto ${className}` : "pointer-events-auto";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `absolute left-0 top-0 p-2 size-full ${styles}`, children });
};

// src/ui/OverlayVFX.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var OverlayVFX = ({ ...props }) => {
  const { audioRef, useAmbientMode = false } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Overlay, { className: "pointer-events-none z-[1] p-0", children: useAmbientMode && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Visualizer, { audioRef }) });
};

// src/ui/Visualizer.tsx
var import_react6 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var Visualizer = ({ audioRef }) => {
  const canvasRef = (0, import_react6.useRef)(null);
  const audioContextRef = (0, import_react6.useRef)(null);
  const analyserRef = (0, import_react6.useRef)(null);
  const animationRef = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(() => {
    if (!audioRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.connect(audioContextRef.current.destination);
    }
    const analyser = analyserRef.current;
    if (!analyser) return;
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const renderFrame = () => {
      analyser.getByteFrequencyData(dataArray);
      const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const intensity = bass / 255;
      const lineWidth = 4 + intensity * 6;
      const brightness = 0.8 + intensity * 0.7;
      ctx.shadowBlur = 30 + intensity * 30;
      ctx.shadowColor = `rgba(255, 0, 0, ${brightness})`;
      ctx.fillStyle = `rgba(255, 0, 0, ${brightness})`;
      ctx.fillRect(0, canvas.height / 2 - lineWidth / 2, canvas.width, lineWidth);
      animationRef.current = requestAnimationFrame(renderFrame);
    };
    renderFrame();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [audioRef]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("canvas", { ref: canvasRef, width: window.innerWidth, height: 5, style: { width: "100%", height: "5px" } });
};

// src/ui/Controls.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var Controls = ({ ...props }) => {
  const {
    source,
    isPlaying,
    handleTogglePlay,
    isEnded,
    isMuted,
    toggleMute,
    volume,
    handleVolumeChange,
    progress,
    currentTime,
    totalTime,
    iconSize = 18,
    isLooped,
    toggleLoop,
    useAmbientMode,
    toggleAmbientMode,
    handleRepeat,
    handleForwardSkip,
    handleBackwardSkip,
    onSeek
  } = props;
  const PlayControlsProps = {
    source,
    iconSize,
    volume,
    isPlaying,
    isEnded,
    isMuted,
    handleTogglePlay,
    handleRepeat,
    handleForwardSkip,
    handleBackwardSkip,
    toggleMute,
    handleVolumeChange
  };
  const TimelineProps = {
    currentTime,
    totalTime,
    progress,
    onSeek
  };
  const PreferenseControlsProps = {
    iconSize,
    useAmbientMode,
    isLooped,
    toggleLoop,
    toggleAmbientMode
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center ml-12 flex-grow gap-6 rounded-xl p-2 pointer-events-auto", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PlayControls, { ...PlayControlsProps }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Timeline, { ...TimelineProps }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PreferenseControls, { ...PreferenseControlsProps })
  ] });
};

// src/icons/IcoForwardNext.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var IcoForwardNext = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      viewBox: "0 0 24 24",
      className,
      height: `${size}px`,
      width: `${size}px`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M12 13.3334L2.77735 19.4818C2.54759 19.635 2.23715 19.5729 2.08397 19.3432C2.02922 19.261 2 19.1645 2 19.0658V4.93433C2 4.65818 2.22386 4.43433 2.5 4.43433C2.59871 4.43433 2.69522 4.46355 2.77735 4.5183L12 10.6667V4.93433C12 4.65818 12.2239 4.43433 12.5 4.43433C12.5987 4.43433 12.6952 4.46355 12.7774 4.5183L23.376 11.584C23.6057 11.7372 23.6678 12.0477 23.5146 12.2774C23.478 12.3323 23.4309 12.3795 23.376 12.4161L12.7774 19.4818C12.5476 19.635 12.2372 19.5729 12.084 19.3432C12.0292 19.261 12 19.1645 12 19.0658V13.3334Z" })
    }
  );
};

// src/icons/IcoForwardBack.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var IcoForwardBack = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      viewBox: "0 0 24 24",
      className,
      height: `${size}px`,
      width: `${size}px`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M12 10.6667L21.2227 4.51823C21.4524 4.36506 21.7629 4.42714 21.9161 4.65691C21.9708 4.73904 22 4.83554 22 4.93426V19.0657C22 19.3419 21.7762 19.5657 21.5 19.5657C21.4013 19.5657 21.3048 19.5365 21.2227 19.4818L12 13.3333V19.0657C12 19.3419 11.7762 19.5657 11.5 19.5657C11.4013 19.5657 11.3048 19.5365 11.2227 19.4818L0.62407 12.416C0.394306 12.2628 0.332219 11.9524 0.485395 11.7226C0.522013 11.6677 0.569144 11.6206 0.62407 11.584L11.2227 4.51823C11.4524 4.36506 11.7629 4.42714 11.9161 4.65691C11.9708 4.73904 12 4.83554 12 4.93426V10.6667Z" })
    }
  );
};

// src/icons/IcoRepeat.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var IcoRepeat = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      viewBox: "0 0 24 24",
      className,
      height: `${size}px`,
      width: `${size}px`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M8 20V21.9325C8 22.2086 7.77614 22.4325 7.5 22.4325C7.38303 22.4325 7.26977 22.3915 7.17991 22.3166L3.06093 18.8841C2.84879 18.7073 2.82013 18.392 2.99691 18.1799C3.09191 18.0659 3.23264 18 3.38103 18L18 18C19.1046 18 20 17.1046 20 16V8H22V16C22 18.2091 20.2091 20 18 20H8ZM16 4V2.0675C16 1.79136 16.2239 1.5675 16.5 1.5675C16.617 1.5675 16.7302 1.60851 16.8201 1.68339L20.9391 5.11587C21.1512 5.29266 21.1799 5.60794 21.0031 5.82008C20.9081 5.93407 20.7674 5.99998 20.619 5.99998L6 6C4.89543 6 4 6.89543 4 8V16H2V8C2 5.79086 3.79086 4 6 4H16Z" })
    }
  );
};

// src/icons/IcoPlay.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var IcoPlay = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      viewBox: "0 0 24 24",
      className,
      height: `${size}px`,
      width: `${size}px`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM10.6219 8.41459C10.5562 8.37078 10.479 8.34741 10.4 8.34741C10.1791 8.34741 10 8.52649 10 8.74741V15.2526C10 15.3316 10.0234 15.4088 10.0672 15.4745C10.1897 15.6583 10.4381 15.708 10.6219 15.5854L15.5008 12.3328C15.5447 12.3035 15.5824 12.2658 15.6117 12.2219C15.7343 12.0381 15.6846 11.7897 15.5008 11.6672L10.6219 8.41459Z" })
    }
  );
};

// src/icons/IcoReport.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var IcoReport = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      className,
      viewBox: "0 0 24 24",
      height: `${size}px`,
      width: `${size}px`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("path", { d: "M3 3H12.382C12.7607 3 13.107 3.214 13.2764 3.55279L14 5H20C20.5523 5 21 5.44772 21 6V17C21 17.5523 20.5523 18 20 18H13.618C13.2393 18 12.893 17.786 12.7236 17.4472L12 16H5V22H3V3Z" })
    }
  );
};

// src/icons/IcoEffect.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var IcoEffect = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      className,
      viewBox: "0 0 24 24",
      height: `${size}px`,
      width: `${size}px`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" })
    }
  );
};

// src/icons/IcoPause.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var IcoPause = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      viewBox: "0 0 24 24",
      className,
      height: `${size}px`,
      width: `${size}px`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9 9V15H11V9H9ZM13 9V15H15V9H13Z" })
    }
  );
};

// src/icons/IcoVolume.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
var IcoVolume = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      className,
      viewBox: "0 0 512 512",
      height: `${size}px`,
      width: `${size}px`,
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { d: "M232 416a23.88 23.88 0 0 1-14.2-4.68 8.27 8.27 0 0 1-.66-.51L125.76 336H56a24 24 0 0 1-24-24V200a24 24 0 0 1 24-24h69.75l91.37-74.81a8.27 8.27 0 0 1 .66-.51A24 24 0 0 1 256 120v272a24 24 0 0 1-24 24zm-106.18-80zm-.27-159.86zM320 336a16 16 0 0 1-14.29-23.19c9.49-18.87 14.3-38 14.3-56.81 0-19.38-4.66-37.94-14.25-56.73a16 16 0 0 1 28.5-14.54C346.19 208.12 352 231.44 352 256c0 23.86-6 47.81-17.7 71.19A16 16 0 0 1 320 336z" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { d: "M368 384a16 16 0 0 1-13.86-24C373.05 327.09 384 299.51 384 256c0-44.17-10.93-71.56-29.82-103.94a16 16 0 0 1 27.64-16.12C402.92 172.11 416 204.81 416 256c0 50.43-13.06 83.29-34.13 120a16 16 0 0 1-13.87 8z" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { d: "M416 432a16 16 0 0 1-13.39-24.74C429.85 365.47 448 323.76 448 256c0-66.5-18.18-108.62-45.49-151.39a16 16 0 1 1 27-17.22C459.81 134.89 480 181.74 480 256c0 64.75-14.66 113.63-50.6 168.74A16 16 0 0 1 416 432z" })
      ]
    }
  );
};

// src/icons/IcoVolumeMute.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var IcoVolumeMute = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      viewBox: "0 0 24 24",
      className,
      height: `${size}px`,
      width: `${size}px`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "M5.88889 16.0001H2C1.44772 16.0001 1 15.5524 1 15.0001V9.00007C1 8.44778 1.44772 8.00007 2 8.00007H5.88889L11.1834 3.66821C11.3971 3.49335 11.7121 3.52485 11.887 3.73857C11.9601 3.8279 12 3.93977 12 4.05519V19.9449C12 20.2211 11.7761 20.4449 11.5 20.4449C11.3846 20.4449 11.2727 20.405 11.1834 20.3319L5.88889 16.0001ZM20.4142 12.0001L23.9497 15.5356L22.5355 16.9498L19 13.4143L15.4645 16.9498L14.0503 15.5356L17.5858 12.0001L14.0503 8.46454L15.4645 7.05032L19 10.5859L22.5355 7.05032L23.9497 8.46454L20.4142 12.0001Z" })
    }
  );
};

// src/icons/IcoArrowDown.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var IcoArrowDown = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      viewBox: "0 0 512 512",
      height: `${size}px`,
      width: `${size}px`,
      className,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z" })
    }
  );
};

// src/icons/IcoMusic.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var IcoMusic = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      role: "img",
      viewBox: "0 0 24 24",
      height: `${size}px`,
      width: `${size}px`,
      className,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("path", { d: "M13.046 9.388a3.919 3.919 0 0 0-.66.19c-.809.312-1.447.991-1.666 1.775a2.269 2.269 0 0 0-.074.81c.048.546.333 1.05.764 1.35a1.483 1.483 0 0 0 2.01-.286c.406-.531.355-1.183.24-1.636-.098-.387-.22-.816-.345-1.249a64.76 64.76 0 0 1-.269-.954zm-.82 10.07c-3.984 0-7.224-3.24-7.224-7.223 0-.98.226-3.02 1.884-4.822A7.188 7.188 0 0 1 9.502 5.6a.792.792 0 1 1 .587 1.472 5.619 5.619 0 0 0-2.795 2.462 5.538 5.538 0 0 0-.707 2.7 5.645 5.645 0 0 0 5.638 5.638c1.844 0 3.627-.953 4.542-2.428 1.042-1.68.772-3.931-.627-5.238a3.299 3.299 0 0 0-1.437-.777c.172.589.334 1.18.494 1.772.284 1.12.1 2.181-.519 2.989-.39.51-.956.888-1.592 1.064a3.038 3.038 0 0 1-2.58-.44 3.45 3.45 0 0 1-1.44-2.514c-.04-.467.002-.93.128-1.376.35-1.256 1.356-2.339 2.622-2.826a5.5 5.5 0 0 1 .823-.246l-.134-.505c-.37-1.371.25-2.579 1.547-3.007.329-.109.68-.145 1.025-.105.792.09 1.476.592 1.709 1.023.258.507-.096 1.153-.706 1.153a.788.788 0 0 1-.54-.213c-.088-.08-.163-.174-.259-.247a.825.825 0 0 0-.632-.166.807.807 0 0 0-.634.551c-.056.191-.031.406.02.595.07.256.159.597.217.82 1.11.098 2.162.54 2.97 1.296 1.974 1.844 2.35 4.886.892 7.233-1.197 1.93-3.509 3.177-5.889 3.177zM0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12Z" })
    }
  );
};

// src/icons/IcoClose.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var IcoClose = ({ color = "currentColor", size = 64, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    "svg",
    {
      stroke: color,
      fill: color,
      strokeWidth: 0,
      viewBox: "0 0 512 512",
      height: `${size}px`,
      width: `${size}px`,
      className,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256z" })
    }
  );
};

// src/ui/PlayControls.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var PlayControls = ({ ...props }) => {
  const { isPlaying, source, isEnded, isMuted, iconSize, volume } = props;
  const { handleTogglePlay, handleRepeat, toggleMute, handleBackwardSkip, handleForwardSkip, handleVolumeChange } = props;
  const currentPercentVolume = volume * 100;
  const togglePlay = () => {
    if (!isEnded) handleTogglePlay(source);
    else handleRepeat();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-center flex-shrink-0 gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Button, { onClick: handleBackwardSkip, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(IcoForwardBack, { size: iconSize }) }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(Button, { className: "group", onClick: togglePlay, children: [
      !isEnded && (isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(IcoPause, { size: iconSize }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(IcoPlay, { size: iconSize })),
      isEnded && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(IcoRepeat, { className: "group-hover:rotate-90 duration-300", size: iconSize })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Button, { onClick: handleForwardSkip, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(IcoForwardNext, { size: iconSize }) }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-center gap-2 group", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Button, { onClick: toggleMute, children: isMuted || volume <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(IcoVolumeMute, { size: iconSize }) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(IcoVolume, { size: iconSize }) }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(VolumeSlider, { volume: currentPercentVolume, volumeChange: handleVolumeChange })
    ] })
  ] });
};

// src/ui/PreferenseControls.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
var PreferenseControls = ({ ...props }) => {
  const {
    isLooped,
    iconSize = 18,
    useAmbientMode,
    toggleLoop,
    toggleAmbientMode
  } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_jsx_runtime19.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-center flex-shrink-0 gap-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Button, { onClick: toggleLoop, active: isLooped, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(IcoRepeat, { size: iconSize }) }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Button, { onClick: toggleAmbientMode, active: useAmbientMode, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(IcoEffect, { size: iconSize }) }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Button, { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(IcoReport, { size: iconSize }) })
  ] }) });
};

// src/ui/ProgressBar.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var ProgressBar = ({ progress }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "absolute left-0 top-0 w-full h-full pointer-events-none bg-neutral-700 rounded-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: { width: `${progress}%` }, className: "h-full bg-orange-500 rounded-full" }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { style: { left: `${progress - 1}%` }, className: "absolute pointer-events-none top-0 bottom-0 my-auto cursor-pointer bg-orange-500 rounded-full size-3" })
  ] });
};

// src/ui/Timeline.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var Timeline = ({ ...props }) => {
  const { currentTime, totalTime, progress, onSeek } = props;
  const currentDuration = durationFormat(currentTime);
  const totalDuration = durationFormat(totalTime);
  const handleSeek = (e) => {
    if (totalTime <= 0) return;
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = offsetX / rect.width * totalTime;
    onSeek(newTime);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex flex-col gap-1 flex-grow", children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { onClick: handleSeek, className: "relative duration-300 w-full h-2 hover:h-3 bg-white/20 rounded-full group cursor-pointer", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(ProgressBar, { progress }) }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex items-center justify-between pointer-events-none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { children: currentDuration }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { children: totalDuration })
    ] })
  ] });
};

// src/ui/CustomImage.tsx
var import_react7 = require("react");
var import_jsx_runtime22 = require("react/jsx-runtime");
var NextImage = (() => {
  try {
    return require("next/image").default;
  } catch (error) {
    return null;
  }
})();
var CustomImage = ({ src, alt, ...props }) => {
  const ImageComponent = (0, import_react7.useMemo)(() => NextImage || "img", []);
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(ImageComponent, { src, alt, ...props });
};

// src/ui/TrackDetails.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var TrackDetails = ({ ...props }) => {
  const { name, description, image, author } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex items-center gap-6", children: [
    image ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(CustomImage, { loading: "lazy", className: "object-cover rounded-full size-[56px]", width: 56, height: 56, src: image, alt: name }) : /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "size-14 p-1 bg-additional rounded-full flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(IcoMusic, { size: 24 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h2", { className: "text-lg text-white font-semibold", children: name }),
      description && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "text-neutral-400 text-sm", children: description })
    ] })
  ] });
};

// src/ui/VolumeSlider.tsx
var import_react8 = require("react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var VolumeSlider = ({ volume, volumeChange }) => {
  const sliderRef = (0, import_react8.useRef)(null);
  const isDragging = (0, import_react8.useRef)(false);
  const handleVolumeChange = (0, import_react8.useCallback)((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const newVolume = Math.round((clientX - rect.left) / rect.width * 100) / 100;
    volumeChange(Math.max(0, Math.min(1, newVolume)));
  }, [volumeChange]);
  const handleMouseDown = (e) => {
    isDragging.current = true;
    handleVolumeChange(e.clientX);
  };
  const handleMouseMove = (0, import_react8.useCallback)((e) => {
    if (isDragging.current) {
      handleVolumeChange(e.clientX);
    }
  }, [handleVolumeChange]);
  const handleMouseUp = () => isDragging.current = false;
  (0, import_react8.useEffect)(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    "div",
    {
      ref: sliderRef,
      className: "relative btn-ghost overflow-hidden duration-300 h-2 w-24",
      onMouseDown: handleMouseDown,
      children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "absolute left-0 h-full bg-white rounded-full", style: { width: `${volume}%` } })
    }
  );
};

// src/ui/Audio.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var Audio = ({ ...props }) => {
  const { audioRef, isLooped, isMuted, source, preload } = props;
  const { handleLoadedMetadata, handleTimeUpdate, handleError } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "audio",
    {
      onTimeUpdate: handleTimeUpdate,
      onLoadedMetadata: handleLoadedMetadata,
      onError: (event) => handleError(event),
      ref: audioRef,
      crossOrigin: "use-credentials",
      loop: isLooped,
      muted: isMuted,
      preload,
      hidden: true,
      children: source && typeof source == "object" ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("source", { src: source.src, type: `audio/${source.mimetype}` }) : /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("source", { src: source || void 0 })
    }
  );
};

// src/ui/VirbixPlayer.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
var VirbixPlayer = () => {
  const { audioRef, player, timeline, playback, ui, vfx } = useMusic();
  const audioProps = {
    audioRef,
    ...player,
    ...playback,
    preload: "auto"
  };
  const controlsProps = {
    ...player,
    ...playback,
    ...vfx,
    ...timeline,
    iconSize: 24
  };
  const vfxProps = {
    audioRef,
    ...vfx
  };
  const className = `fixed duration-300 flex items-center z-10 right-0 bottom-0 min-h-24 w-full backdrop-blur-sm border-t border-white/15 p-6 ${ui.isCollapse ? "translate-y-64" : "translate-y-0"} ${!player.source || ui.isClose ? "opacity-0 pointer-events-none" : "opacity-100"}`;
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Audio, { ...audioProps }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(TrackDetails, { ...player.trackInfo }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(OverlayVFX, { ...vfxProps }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Controls, { ...controlsProps }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: `absolute gap-3 duration-300 flex items-center p-2 justify-center rounded-full right-6 ${ui.isCollapse ? "-translate-y-64" : "-translate-y-16"}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Button, { onClick: ui.toggleCollapse, active: ui.isCollapse, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(IcoArrowDown, { size: 24, className: `duration-300 ${ui.isCollapse && "rotate-180"}` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Button, { onClick: playback.handleToggleClose, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(IcoClose, { size: 24 }) })
    ] })
  ] });
};

// src/ui/MusicProvider.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var MusicContext = (0, import_react9.createContext)(null);
var MusicProvider = ({ children }) => {
  const audioRef = (0, import_react9.useRef)(null);
  const player = usePlayerState({ volume: 0.05 });
  const timeline = useTimeline({ audioRef });
  const ui = usePlayerUI();
  const playback = usePlayerPlayback({ audioRef, ...timeline, ...player, ...ui });
  const vfx = usePlayerVFX();
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(MusicContext.Provider, { value: { audioRef, player, timeline, ui, playback, vfx }, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(VirbixPlayer, {})
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MusicContext,
  MusicProvider,
  VirbixPlayer,
  useMusic
});
