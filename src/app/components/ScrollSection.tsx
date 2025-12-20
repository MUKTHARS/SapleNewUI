// src/app/components/ScrollSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { MessageSquare, Brain, BarChart, ArrowRight } from 'lucide-react';

const scrollSections = [
  {
    id: 'ai-agent',
    title: 'AI Agent',
    subtitle: 'Human-centric AI agents for exceptional, trustworthy CX',
    // description: 'Deploy empathetic AI agents that understand context, emotions, and intent to deliver human-like interactions at scale.',
    ctaText: 'Explore AI Agent',
    icon: <Brain className="w-5 h-5" />,
    color: '#0EA5E9',
    videoSrc: '/videos/contact-hero.mp4',
    features: [
      'Context-aware conversations',
      'Emotional intelligence',
      'Seamless human handoff',
      '24/7 availability'
    ]
  },
  {
    id: 'agent-assist',
    title: 'Agent Assist',
    subtitle: 'Agent Assist " Real-time guidance. Trusted knowledge. Automated workflows."',
    // description: 'Empower your team with AI copilots that provide real-time suggestions, automate routine tasks, and enhance decision-making.',
    ctaText: 'Explore Agent Assist',
    icon: <MessageSquare className="w-5 h-5" />,
    color: '#8B5CF6',
    videoSrc: '/videos/contact-hero.mp4',
    features: [
      'Real-time agent coaching',
      'Automated note taking',
      'Instant knowledge access',
      'Performance insights'
    ]
  },
  {
    id: 'conversation-intelligence',
    title: 'Conversation Intelligence',
    subtitle: ' "Converstional Intell" Capture the voice of your customer at scale by uncovering hidden signals in every conversation — and turn insights into action',
    // description: 'Transform conversations into data-driven insights with advanced analytics, sentiment analysis, and performance metrics.',
    ctaText: 'Explore Conversation Intelligence',
    icon: <BarChart className="w-5 h-5" />,
    color: '#10B981',
    videoSrc: '/videos/contact-hero.mp4',
    features: [
      'Sentiment analysis',
      'Trend identification',
      'Compliance monitoring',
      'Quality scoring'
    ]
  }
];

export function ScrollSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean[]>([]);

  const handleSectionClick = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    
    setIsScrolling(true);
    const sectionHeight = scrollContainerRef.current.clientHeight;
    const targetScroll = index * sectionHeight;
    
    scrollContainerRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => setIsScrolling(false), 500);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isScrolling) return;
    
    const scrollTop = scrollContainerRef.current.scrollTop;
    const containerHeight = scrollContainerRef.current.clientHeight;
    
    const currentSection = Math.floor(scrollTop / containerHeight);
    const newActiveSection = Math.min(currentSection, scrollSections.length - 1);
    
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  }, [isScrolling, activeSection]);

  const handleVideoLoaded = useCallback((index: number) => {
    setIsVideoLoaded(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  }, []);

  // Initialize video loaded state
  useEffect(() => {
    setIsVideoLoaded(new Array(scrollSections.length).fill(false));
  }, []);

  // Manage video playback based on active section
  useEffect(() => {
    if (!isScrolling) {
      // Play active section video
      const activeVideo = videoRefs.current[activeSection];
      if (activeVideo) {
        activeVideo.play().catch(() => {
          // Autoplay was prevented, continue muted
          console.log('Autoplay prevented');
        });
      }
      
      // Pause other videos
      videoRefs.current.forEach((video, index) => {
        if (video && index !== activeSection) {
          video.pause();
          video.currentTime = 0;
        }
      });
    } else {
      // Pause all videos while scrolling
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
        }
      });
    }
  }, [activeSection, isScrolling]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const newIndex = e.key === 'ArrowDown' 
          ? Math.min(activeSection + 1, scrollSections.length - 1)
          : Math.max(activeSection - 1, 0);
        handleSectionClick(newIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, handleSectionClick]);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.1) 0px, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main heading */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Intelligent Customer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Service Platform
              </span>
            </h2>
            {/* <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch our platform in action - each video demonstrates a key capability
            </p> */}
          </motion.div>
        </div>

        {/* Main content container with internal scroll */}
        <div className="relative h-[85vh]">
          {/* Left column - Static topics (matches video height) */}
          <div className="absolute left-0 top-0 h-full w-full lg:w-2/5 z-10">
            <div className="sticky top-24 h-[calc(100%-6rem)] flex flex-col justify-center">
              <div className="space-y-2">
                {scrollSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={`relative pl-8 py-6 cursor-pointer transition-all duration-300 ${
                        activeSection === index 
                          ? 'opacity-100' 
                          : 'opacity-50 hover:opacity-70'
                      }`}
                      onClick={() => handleSectionClick(index)}
                    >
                      {/* Active indicator line */}
                      <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-12 rounded-full transition-all duration-300 ${
                        activeSection === index 
                          ? 'bg-gradient-to-b from-cyan-500 to-blue-500' 
                          : 'bg-gray-700'
                      }`} />

                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          activeSection === index 
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 scale-110' 
                            : 'bg-gray-900/50 border border-gray-800'
                        }`}>
                          <div style={{ color: activeSection === index ? section.color : '#9CA3AF' }}>
                            {section.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300 ${
                            activeSection === index ? 'text-white' : 'text-gray-400'
                          }`}>
                            {section.title}
                          </h3>
                          <p className={`text-sm transition-colors duration-300 line-clamp-2 ${
                            activeSection === index ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {section.subtitle}
                          </p>
                          
                          {/* Video loading indicator */}
                          {activeSection === index && !isVideoLoaded[index] && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-3 flex items-center gap-2"
                            >
                              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                              <span className="text-xs text-gray-400">
                                Loading video...
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Full height video container */}
          <div className="absolute right-0 top-0 h-full w-full lg:w-3/5">
            <div 
              ref={scrollContainerRef}
              className="h-full overflow-y-auto scroll-smooth snap-y snap-mandatory hide-scrollbar"
            >
              {/* Each section takes full viewport height */}
              {scrollSections.map((section, index) => (
                <div
                  key={section.id}
                  className="h-full snap-start relative"
                >
                  {/* Video container - matches left column height exactly */}
                  <div className="absolute inset-0">
                    {/* Background fallback */}
                    <div className={`absolute inset-0 ${
                      index === 0 ? 'bg-gradient-to-br from-cyan-900/20 to-blue-900/20' :
                      index === 1 ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20' :
                      'bg-gradient-to-br from-emerald-900/20 to-green-900/20'
                    }`} />
                    
                    {/* Video element - no play button, just the video */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full max-w-4xl mx-auto"
                      >
                        {/* Video container with proper aspect ratio but fits available space */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-800">
                          <video
                            ref={el => { videoRefs.current[index] = el; }}
                            autoPlay={index === 0}
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            poster={`/videos/${section.id}-poster.jpg`}
                            onLoadedData={() => handleVideoLoaded(index)}
                          >
                            <source src={section.videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          
                          {/* Subtle gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                          
                          {/* Content overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 rounded-lg">
                              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {section.title}
                              </h3>
                              {/* <p className="text-gray-300 text-sm md:text-base">
                                {section.description}
                              </p>
                               */}
                              {/* Features list */}
                              <div className="flex flex-wrap gap-3 mt-4">
                                {section.features.map((feature, idx) => (
                                  <div 
                                    key={idx}
                                    className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg border border-gray-800"
                                  >
                                    <span className="text-xs text-gray-300">{feature}</span>
                                  </div>
                                ))}
                              </div>
                              
                              {/* CTA Button */}
                              <div className="mt-6">
                                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 border border-gray-700 hover:border-cyan-500/30">
                                  <span>{section.ctaText}</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {scrollSections.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSectionClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeSection === index 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 w-8 h-2' 
                    : 'bg-gray-700 w-2 h-2 hover:bg-gray-600'
                }`}
                aria-label={`Go to ${scrollSections[index].title} demo`}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 text-sm text-gray-500">
            <span className="hidden lg:inline">Scroll or use arrow keys to navigate</span>
            <span className="lg:hidden">Swipe up/down to navigate</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '100ms' }}></div>
              <div className="w-1 h-1 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '200ms' }}></div>
            </div>
          </div>
        </div>

        {/* Mobile view - Stacked layout */}
        <div className="lg:hidden mt-12">
          <div className="space-y-12">
            {scrollSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 overflow-hidden"
              >
                {/* Mobile video */}
                <div className="aspect-video w-full">
                  <video
                    autoPlay={index === 0}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    poster={`/videos/${section.id}-poster.jpg`}
                  >
                    <source src={section.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700`}>
                      <div style={{ color: section.color }}>
                        {section.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {section.subtitle}
                  </h4>
                  <p className="text-gray-300 mb-6">
                    {section.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {section.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: section.color }} />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="inline-flex items-center gap-2 text-cyan-400 font-medium">
                    {section.ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .snap-y {
          scroll-snap-type: y mandatory;
        }
        .snap-start {
          scroll-snap-align: start;
        }
        
        /* Remove all video controls */
        video::-webkit-media-controls {
          display: none !important;
        }
        video::-webkit-media-controls-enclosure {
          display: none !important;
        }
        video::-webkit-media-controls-panel {
          display: none !important;
        }
        video::-webkit-media-controls-play-button {
          display: none !important;
        }
        video::-webkit-media-controls-timeline {
          display: none !important;
        }
        video::-webkit-media-controls-current-time-display {
          display: none !important;
        }
        video::-webkit-media-controls-time-remaining-display {
          display: none !important;
        }
        video::-webkit-media-controls-mute-button {
          display: none !important;
        }
        video::-webkit-media-controls-volume-slider {
          display: none !important;
        }
        video::-webkit-media-controls-fullscreen-button {
          display: none !important;
        }
      `}</style>
    </section>
  );
}