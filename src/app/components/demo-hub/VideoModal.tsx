'use client';

import { motion } from 'framer-motion';
import { X, Download, Share2, ExternalLink, PlayCircle, Eye, ThumbsUp, Clock } from 'lucide-react';
import { useState, useRef } from 'react';

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

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState(1247);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Handle autoplay restriction
          console.log('Autoplay prevented');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = video.videoUrl;
    link.download = `${video.id}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="px-3 py-1.5 bg-[#0c7075]/10 text-[#0c7075] rounded-lg text-sm font-semibold">
                {video.category}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {views.toLocaleString()} views
                </span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{video.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
          <video
            ref={videoRef}
            controls
            autoPlay
            className="w-full h-full"
            poster={video.thumbnail}
            src={video.videoUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Custom Play/Pause Overlay for autoplay failures */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
              onClick={handlePlayPause}
            >
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <PlayCircle className="w-10 h-10 text-[#0c7075]" />
              </div>
            </div>
          )}
        </div>

        {/* Video Info and Actions */}
        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Description */}
            <div className="lg:col-span-2">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {video.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {video.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-[#0c7075]/10 to-[#0c7075]/5 text-[#0c7075] rounded-lg text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Demo Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Industry:</span> {video.category}
                  </div>
                  <div>
                    <span className="font-medium">Use Case:</span> Customer Support
                  </div>
                  <div>
                    <span className="font-medium">AI Model:</span> Custom LLM v2.5
                  </div>
                  <div>
                    <span className="font-medium">Integration:</span> CRM & Ticketing
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Demo</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium border-2 border-gray-200"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share Demo</span>
                </button>

                <button
                  onClick={() => window.open(`/contact?demo=${video.id}`, '_blank')}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#0c7075] to-[#0a4a4d] text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium shadow-lg shadow-[#0c7075]/20"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Get Custom Demo</span>
                </button>
              </div>

              {/* Like Button */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Was this demo helpful?</h4>
                  <button
                    onClick={() => {
                      setLiked(!liked);
                      if (!liked) {
                        setViews(views + 1);
                      }
                    }}
                    className={`p-2 rounded-lg transition-all duration-300 ${liked ? 'text-[#0c7075] bg-[#0c7075]/10' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                  >
                    <ThumbsUp className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  {liked ? 'Thank you for your feedback!' : 'Help us improve our demos'}
                </p>
              </div>

              {/* Related Demos */}
              <div className="bg-gradient-to-br from-[#0c7075]/5 to-[#0c7075]/10 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Related Demos</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-between text-gray-600 hover:text-[#0c7075] transition-colors cursor-pointer">
                    <span>Agent Assist Workflow</span>
                    <PlayCircle className="w-4 h-4" />
                  </li>
                  <li className="flex items-center justify-between text-gray-600 hover:text-[#0c7075] transition-colors cursor-pointer">
                    <span>Voice AI Integration</span>
                    <PlayCircle className="w-4 h-4" />
                  </li>
                  <li className="flex items-center justify-between text-gray-600 hover:text-[#0c7075] transition-colors cursor-pointer">
                    <span>Multi-language Support</span>
                    <PlayCircle className="w-4 h-4" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import { X, Download, Share2, ExternalLink, PlayCircle, Eye, ThumbsUp } from 'lucide-react';
// import { useState } from 'react';

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

// interface VideoModalProps {
//   video: Video;
//   onClose: () => void;
// }

// export function VideoModal({ video, onClose }: VideoModalProps) {
//   const [liked, setLiked] = useState(false);
//   const [views, setViews] = useState(1247);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = video.videoUrl;
//     link.download = `${video.id}.mp4`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: video.title,
//         text: video.description,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Link copied to clipboard!');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.9, y: 20 }}
//         className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
//       >
//         {/* Modal Header */}
//         <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <div className="px-3 py-1.5 bg-[#0c7075]/10 text-[#0c7075] rounded-lg text-sm font-semibold">
//                 {video.category}
//               </div>
//               <div className="flex items-center gap-4 text-sm text-gray-500">
//                 <span className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   {video.duration}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Eye className="w-4 h-4" />
//                   {views.toLocaleString()} views
//                 </span>
//               </div>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-900">{video.title}</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Video Player */}
//         <div className="aspect-video bg-gradient-to-br from-gray-900 to-black">
//           <video
//             controls
//             autoPlay
//             className="w-full h-full"
//             poster={video.thumbnail}
//             src={video.videoUrl}
//           >
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         {/* Video Info and Actions */}
//         <div className="p-8">
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Left Column - Description */}
//             <div className="lg:col-span-2">
//               <p className="text-gray-700 text-lg leading-relaxed mb-6">
//                 {video.description}
//               </p>
              
//               <div className="flex flex-wrap gap-2 mb-8">
//                 {video.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-4 py-2 bg-gradient-to-r from-[#0c7075]/10 to-[#0c7075]/5 text-[#0c7075] rounded-lg text-sm font-medium"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               {/* Additional Info */}
//               <div className="bg-gray-50 rounded-xl p-6">
//                 <h4 className="font-semibold text-gray-900 mb-3">Demo Details</h4>
//                 <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//                   <div>
//                     <span className="font-medium">Industry:</span> {video.category}
//                   </div>
//                   <div>
//                     <span className="font-medium">Use Case:</span> Customer Support
//                   </div>
//                   <div>
//                     <span className="font-medium">AI Model:</span> Custom LLM v2.5
//                   </div>
//                   <div>
//                     <span className="font-medium">Integration:</span> CRM & Ticketing
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Actions */}
//             <div className="space-y-6">
//               {/* Action Buttons */}
//               <div className="space-y-3">
//                 <button
//                   onClick={handleDownload}
//                   className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium"
//                 >
//                   <Download className="w-5 h-5" />
//                   <span>Download Demo</span>
//                 </button>
                
//                 <button
//                   onClick={handleShare}
//                   className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium border-2 border-gray-200"
//                 >
//                   <Share2 className="w-5 h-5" />
//                   <span>Share Demo</span>
//                 </button>

//                 <button
//                   onClick={() => window.open(`/contact?demo=${video.id}`, '_blank')}
//                   className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#0c7075] to-[#0a4a4d] text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium shadow-lg shadow-[#0c7075]/20"
//                 >
//                   <ExternalLink className="w-5 h-5" />
//                   <span>Get Custom Demo</span>
//                 </button>
//               </div>

//               {/* Like Button */}
//               <div className="bg-gray-50 rounded-xl p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h4 className="font-semibold text-gray-900">Was this demo helpful?</h4>
//                   <button
//                     onClick={() => {
//                       setLiked(!liked);
//                       if (!liked) {
//                         setViews(views + 1);
//                       }
//                     }}
//                     className={`p-2 rounded-lg transition-all duration-300 ${liked ? 'text-[#0c7075] bg-[#0c7075]/10' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
//                   >
//                     <ThumbsUp className="w-6 h-6" />
//                   </button>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   {liked ? 'Thank you for your feedback!' : 'Help us improve our demos'}
//                 </p>
//               </div>

//               {/* Related Demos */}
//               <div className="bg-gradient-to-br from-[#0c7075]/5 to-[#0c7075]/10 rounded-xl p-6">
//                 <h4 className="font-semibold text-gray-900 mb-3">Related Demos</h4>
//                 <ul className="space-y-3 text-sm">
//                   <li className="flex items-center justify-between text-gray-600 hover:text-[#0c7075] transition-colors">
//                     <span>Agent Assist Workflow</span>
//                     <PlayCircle className="w-4 h-4" />
//                   </li>
//                   <li className="flex items-center justify-between text-gray-600 hover:text-[#0c7075] transition-colors">
//                     <span>Voice AI Integration</span>
//                     <PlayCircle className="w-4 h-4" />
//                   </li>
//                   <li className="flex items-center justify-between text-gray-600 hover:text-[#0c7075] transition-colors">
//                     <span>Multi-language Support</span>
//                     <PlayCircle className="w-4 h-4" />
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // Add missing Clock component
// const Clock = ({ className }: { className?: string }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );
