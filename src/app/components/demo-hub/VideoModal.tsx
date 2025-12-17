// src/app/components/demo-hub/VideoModal.tsx
'use client';

import { motion } from 'framer-motion';
import { X, Download, Share2, ExternalLink } from 'lucide-react';

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
  const handleDownload = () => {
    // Implement download logic
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{video.title}</h2>
            <p className="text-gray-600 mt-1">{video.category} • {video.duration}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black">
          <video
            controls
            className="w-full h-full"
            poster={video.thumbnail}
            src={video.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Info */}
        <div className="p-6">
          <p className="text-gray-700 mb-6">{video.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {video.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#0c7075] text-white rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-[#0c7075]text-[#0c7075] rounded-lg hover:bg-[#0c7075] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={() => window.open(`/contact?demo=${video.id}`, '_blank')}
              className="flex items-center space-x-2 px-4 py-2 bg-[#0c7075] text-white rounded-lg hover:bg-[#0c7075] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Get a Custom Demo</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}