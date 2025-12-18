'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Clock, Eye, Zap, Pause } from 'lucide-react';
import { VideoModal } from './VideoModal';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  tags: string[];
}

interface VideoGridProps {
  videos: Video[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Handle video hover play/pause
  useEffect(() => {
    if (hoveredVideo && videoRefs.current[hoveredVideo]) {
      const video = videoRefs.current[hoveredVideo];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {
          // Autoplay prevented, show play button instead
          setPlayingVideo(null);
        });
        setPlayingVideo(hoveredVideo);
      }
    } else if (playingVideo && videoRefs.current[playingVideo]) {
      const video = videoRefs.current[playingVideo];
      if (video) {
        video.pause();
        video.currentTime = 0;
        setPlayingVideo(null);
      }
    }
  }, [hoveredVideo, playingVideo]);

  // Handle video play on click
  const handleCardClick = (video: Video) => {
    if (playingVideo === video.id) {
      // If already playing, open modal
      setSelectedVideo(video);
    } else {
      // Start playing the video
      if (videoRefs.current[video.id]) {
        const videoElement = videoRefs.current[video.id];
        if (videoElement) {
          videoElement.currentTime = 0;
          videoElement.play().catch(() => {
            // If autoplay fails, open modal
            setSelectedVideo(video);
          });
          setPlayingVideo(video.id);
        }
      }
    }
  };

  // Handle video play/pause toggle
  const handlePlayPause = (e: React.MouseEvent, videoId: string) => {
    e.stopPropagation();
    if (playingVideo === videoId) {
      // Pause video
      if (videoRefs.current[videoId]) {
        videoRefs.current[videoId]?.pause();
        setPlayingVideo(null);
      }
    } else {
      // Play video
      if (videoRefs.current[videoId]) {
        const videoElement = videoRefs.current[videoId];
        if (videoElement) {
          videoElement.currentTime = 0;
          videoElement.play().catch(() => {
            // If autoplay fails, set as playing anyway (will show controls)
            setPlayingVideo(videoId);
          });
          setPlayingVideo(videoId);
        }
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
            onClick={() => handleCardClick(video)}
          >
            {/* Premium Glass Card */}
            <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer
                bg-gradient-to-br from-white/90 via-white/70 to-white/90
                backdrop-blur-md
                border border-white/80
                border-t-white/90
                border-l-white/90
                shadow-[0_8px_32px_rgba(14,165,233,0.08)]
                shadow-sky-200/30
                before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-1px_0_0_rgba(12,112,117,0.1)]
                hover:shadow-[0_20px_50px_rgba(12,112,117,0.15)]
                hover:shadow-[#0c7075]/40
                hover:scale-[1.02]
                hover:bg-gradient-to-br from-white via-white/85 to-white
                hover:border-white
                hover:before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(12,112,117,0.15)]"
            >
              
              {/* Green reflection layer */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(
                    135deg,
                    rgba(12, 112, 117, 0.03) 0%,
                    rgba(12, 112, 117, 0.02) 50%,
                    rgba(12, 112, 117, 0.01) 100%
                  )`
                }}
              />

              {/* Video Thumbnail with Video Player */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                {/* Video Element */}
                <video
                  ref={(el) => {
                    videoRefs.current[video.id] = el;
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={video.videoUrl}
                  poster={video.thumbnail || undefined}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onClick={(e) => e.stopPropagation()}
                  onEnded={() => setPlayingVideo(null)}
                />
                
                {/* Fallback if video fails to load */}
                {!video.videoUrl && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-[#0c7075]/50" />
                  </div>
                )}

                {/* Play/Pause Overlay */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    playingVideo === video.id ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                  }`}
                  onClick={(e) => handlePlayPause(e, video.id)}
                >
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      playingVideo === video.id 
                        ? 'bg-white/90 shadow-lg' 
                        : 'bg-white/90 shadow-lg group-hover:scale-110'
                    }`}>
                      {playingVideo === video.id ? (
                        <Pause className="w-8 h-8 text-[#0c7075]" />
                      ) : (
                        <PlayCircle className="w-8 h-8 text-[#0c7075]" />
                      )}
                    </div>
                    {/* Pulse animation on hover when not playing */}
                    {hoveredVideo === video.id && playingVideo !== video.id && (
                      <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-[#0c7075]/30"
                      />
                    )}
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm z-10">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0c7075] px-3 py-1.5 rounded-lg text-xs font-semibold z-10">
                  {video.category}
                </div>

                {/* Playing Indicator */}
                {playingVideo === video.id && (
                  <div className="absolute top-3 right-3 bg-[#0c7075] text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 z-10">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Playing</span>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0c7075] transition-colors duration-300">
                  {video.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {video.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-1 text-xs font-medium text-[#0c7075] bg-[#0c7075]/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {video.tags.length > 2 && (
                    <span className="px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                      +{video.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-[#0c7075]/20 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#0c7075] group-hover:text-[#0c7075]/80 transition-colors">
                    {playingVideo === video.id ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Pause Demo</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4" />
                        <span>Watch Demo</span>
                      </>
                    )}
                  </div>
                  <button 
                    className="p-2 text-gray-400 hover:text-[#0c7075] hover:bg-[#0c7075]/10 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideo(video);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Edge highlight for premium look */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 border border-[#0c7075]/20 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset]" />
              </div>
            </div>

            {/* Hover indicator dot */}
            {hoveredVideo === video.id && playingVideo !== video.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#0c7075] to-[#0a4a4d] flex items-center justify-center shadow-lg z-20"
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { PlayCircle, Clock, Eye, Zap } from 'lucide-react';
// import { VideoModal } from './VideoModal';

// interface Video {
//   id: string;
//   title: string;
//   description: string;
//   duration: string;
//   category: string;
//   thumbnail: string;
//   videoUrl: string;
//   tags: string[];
// }

// interface VideoGridProps {
//   videos: Video[];
// }

// export function VideoGrid({ videos }: VideoGridProps) {
//   const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
//   const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {videos.map((video, index) => (
//           <motion.div
//             key={video.id}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             className="group relative"
//             onMouseEnter={() => setHoveredVideo(video.id)}
//             onMouseLeave={() => setHoveredVideo(null)}
//           >
//             {/* Premium Glass Card - Similar to KeyCapabilities */}
//             <div 
//               onClick={() => setSelectedVideo(video)}
//               className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer
//                 /* Glass base */
//                 bg-gradient-to-br from-white/90 via-white/70 to-white/90
//                 backdrop-blur-md
//                 /* Borders for glass effect */
//                 border border-white/80
//                 border-t-white/90
//                 border-l-white/90
//                 /* Sophisticated shadows */
//                 shadow-[0_8px_32px_rgba(14,165,233,0.08)]
//                 shadow-sky-200/30
//                 /* Inner shadow for depth */
//                 before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-1px_0_0_rgba(12,112,117,0.1)]
//                 /* Hover effects */
//                 hover:shadow-[0_20px_50px_rgba(12,112,117,0.15)]
//                 hover:shadow-[#0c7075]/40
//                 hover:scale-[1.02]
//                 hover:bg-gradient-to-br from-white via-white/85 to-white
//                 hover:border-white
//                 hover:before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(12,112,117,0.15)]"
//             >
              
//               {/* Green reflection layer - visible through glass */}
//               <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                 style={{
//                   background: `linear-gradient(
//                     135deg,
//                     rgba(12, 112, 117, 0.03) 0%,
//                     rgba(12, 112, 117, 0.02) 50%,
//                     rgba(12, 112, 117, 0.01) 100%
//                   )`
//                 }}
//               />

//               {/* Video Thumbnail */}
//               <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
//                 {/* Thumbnail Placeholder with Play Icon */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="relative">
//                     <div className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                       <PlayCircle className="w-8 h-8 text-[#0c7075]" />
//                     </div>
//                     {/* Pulse animation on hover */}
//                     {hoveredVideo === video.id && (
//                       <motion.div
//                         initial={{ scale: 1, opacity: 1 }}
//                         animate={{ scale: 1.5, opacity: 0 }}
//                         transition={{ duration: 1.5, repeat: Infinity }}
//                         className="absolute inset-0 rounded-full border-2 border-[#0c7075]/30"
//                       />
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Duration Badge */}
//                 <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm">
//                   <Clock className="w-3 h-3" />
//                   {video.duration}
//                 </div>

//                 {/* Category Badge */}
//                 <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0c7075] px-3 py-1.5 rounded-lg text-xs font-semibold">
//                   {video.category}
//                 </div>

//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </div>

//               {/* Video Info */}
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0c7075] transition-colors duration-300">
//                   {video.title}
//                 </h3>

//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
//                   {video.description}
//                 </p>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2 mb-5">
//                   {video.tags.slice(0, 2).map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className="px-2.5 py-1 text-xs font-medium text-[#0c7075] bg-[#0c7075]/10 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                   {video.tags.length > 2 && (
//                     <span className="px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
//                       +{video.tags.length - 2}
//                     </span>
//                   )}
//                 </div>

//                 {/* Action Button */}
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-[#0c7075]/20 transition-colors">
//                   <div className="flex items-center gap-2 text-sm font-medium text-[#0c7075] group-hover:text-[#0c7075]/80 transition-colors">
//                     <PlayCircle className="w-4 h-4" />
//                     <span>Watch Demo</span>
//                   </div>
//                   <Eye className="w-4 h-4 text-gray-400 group-hover:text-[#0c7075] transition-colors" />
//                 </div>
//               </div>

//               {/* Edge highlight for premium look */}
//               <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                 <div className="absolute inset-0 border border-[#0c7075]/20 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset]" />
//               </div>
//             </div>

//             {/* Hover indicator dot */}
//             {hoveredVideo === video.id && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#0c7075] to-[#0a4a4d] flex items-center justify-center shadow-lg z-20"
//               >
//                 <Zap className="w-3 h-3 text-white" />
//               </motion.div>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* Video Modal */}
//       <AnimatePresence>
//         {selectedVideo && (
//           <VideoModal
//             video={selectedVideo}
//             onClose={() => setSelectedVideo(null)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
