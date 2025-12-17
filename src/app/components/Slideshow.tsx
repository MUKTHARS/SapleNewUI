// src/app/components/Slideshow.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, MessageSquare, Smartphone, BarChart3, Cpu } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "AI-Powered Conversations",
    description: "Natural, human-like interactions that understand context and intent",
    icon: <MessageSquare className="w-12 h-12" />,
    color: "from-blue-500/20 to-cyan-500/20",
    textColor: "text-blue-900"
  },
  {
    id: 2,
    title: "Multi-Channel Support",
    description: "Seamlessly handle voice, chat, email, and social media interactions",
    icon: <Smartphone className="w-12 h-12" />,
    color: "from-purple-500/20 to-pink-500/20",
    textColor: "text-purple-900"
  },
  {
    id: 3,
    title: "Real-Time Analytics",
    description: "Monitor performance and gain insights with live dashboards",
    icon: <BarChart3 className="w-12 h-12" />,
    color: "from-green-500/20 to-emerald-500/20",
    textColor: "text-green-900"
  },
  {
    id: 4,
    title: "Enterprise Integration",
    description: "Connect with your existing CRM, ERP, and business systems",
    icon: <Cpu className="w-12 h-12" />,
    color: "from-amber-500/20 to-orange-500/20",
    textColor: "text-amber-900"
  }
];

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full">
      {/* Slides container */}
      <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 0.9,
              zIndex: currentSlide === index ? 10 : 0
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={`absolute inset-0 ${slide.color} rounded-2xl`}
          >
            {/* Slide content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ 
                  y: currentSlide === index ? 0 : 50, 
                  opacity: currentSlide === index ? 1 : 0 
                }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center max-w-md"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg mb-4">
                    <div className={slide.textColor}>
                      {slide.icon}
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className={`text-2xl md:text-3xl font-bold ${slide.textColor} mb-4`}>
                  {slide.title}
                </h3>
                
                {/* Description */}
                <p className={`${slide.textColor}/80 text-lg`}>
                  {slide.description}
                </p>
              </motion.div>
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 1px, transparent 1px),
                                radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
              }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
        {/* Dots indicator */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative w-2 h-2 rounded-full bg-gray-400/50 hover:bg-gray-600 transition-colors"
            >
              {currentSlide === index && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full bg-gray-800"
                />
              )}
            </button>
          ))}
        </div>

        {/* Play/Pause button */}
        {/* <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all shadow-sm"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-gray-700" />
          ) : (
            <Play className="w-4 h-4 text-gray-700" />
          )}
        </button> */}
      </div>

      {/* Navigation arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all shadow-sm"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button> */}
{/* 
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all shadow-sm"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button> */}

      {/* Progress bar */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50"> */}
        {/* <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          className="h-full bg-gray-600"
          onAnimationComplete={() => {
            if (isPlaying) nextSlide();
          }}
        /> */}
      {/* </div> */}
    </div>
  );
}