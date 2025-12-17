// src/app/components/demo-hub/VideoGrid.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Clock, ExternalLink } from 'lucide-react';
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Placeholder thumbnail - replace with actual image */}
                <div className="w-full h-full flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-bg-color-600 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Video Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-bg-color-600 bg-color-50 px-2 py-1 rounded">
                    {video.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-bg-color-600 transition-colors">
                  {video.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {video.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center space-x-2 text-bg-color-600 hover:text-bg-color-700 font-medium text-sm">
                  <PlayCircle className="w-4 h-4" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
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