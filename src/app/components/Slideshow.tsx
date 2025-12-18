// src/app/components/Slideshow.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Smartphone, BarChart3, Cpu, Zap } from 'lucide-react';
import Lottie from 'lottie-react';

// Define interface for Lottie data
interface LottieAnimationData {
  [key: string]: unknown;
}

// Define slide data with CORRECTED Lottie file paths
const slides = [
  {
    id: 1,
    title: "AI-Powered Conversations",
    description: "Natural, human-like interactions that understand context and intent",
    lottieFile: "/lotti/ai-chat.json", // Matches your public folder structure
    fallbackIcon: <MessageSquare className="w-16 h-16" />,
    color: "from-blue-50 to-cyan-50",
    textColor: "text-blue-900",
    accentColor: "text-blue-600"
  },
  {
    id: 2,
    title: "Multi-Channel Support",
    description: "Seamlessly handle voice, chat, email, and social media interactions",
    lottieFile: "/lotti/multi-channel.json", // Matches your public folder structure
    fallbackIcon: <Smartphone className="w-16 h-16" />,
    color: "from-purple-50 to-pink-50",
    textColor: "text-purple-900",
    accentColor: "text-purple-600"
  },
  {
    id: 3,
    title: "Real-Time Analytics",
    description: "Monitor performance and gain insights with live dashboards",
    lottieFile: "/lotti/analytics.json", // Matches your public folder structure
    fallbackIcon: <BarChart3 className="w-16 h-16" />,
    color: "from-green-50 to-emerald-50",
    textColor: "text-green-900",
    accentColor: "text-green-600"
  },
  {
    id: 4,
    title: "Enterprise Integration",
    description: "Connect with your existing CRM, ERP, and business systems",
    lottieFile: "/lotti/integration.json", // Matches your public folder structure
    fallbackIcon: <Cpu className="w-16 h-16" />,
    color: "from-amber-50 to-orange-50",
    textColor: "text-amber-900",
    accentColor: "text-amber-600"
  }
];

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying] = useState(true);
  const [lottieData, setLottieData] = useState<(LottieAnimationData | null)[]>(Array(slides.length).fill(null));
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Load Lottie animations with better error handling
  useEffect(() => {
    const loadLottieAnimations = async () => {
      setLoading(true);
      const loadedAnimations = [...lottieData];
      
      const loadPromises = slides.map(async (slide, i) => {
        try {
          // Using direct fetch from public directory
          const response = await fetch(slide.lottieFile);
          if (response.ok) {
            const data = await response.json();
            loadedAnimations[i] = data;
          } else {
            console.warn(`Failed to load ${slide.lottieFile}: ${response.status}`);
            loadedAnimations[i] = null;
          }
        } catch (error) {
          console.error(`Error loading ${slide.lottieFile}:`, error);
          loadedAnimations[i] = null;
        }
      });
      
      await Promise.all(loadPromises);
      setLottieData(loadedAnimations);
      setLoading(false);
    };

    loadLottieAnimations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Slides container with responsive height */}
      <div className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-lg">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 0.95,
              zIndex: currentSlide === index ? 10 : 0
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={`absolute inset-0 ${slide.color} rounded-2xl`}
          >
            {/* Slide content with better responsive spacing */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-4 md:p-6 lg:p-8">
              {/* Animation/Icon Container */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: currentSlide === index ? 0 : 30, 
                  opacity: currentSlide === index ? 1 : 0 
                }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full md:w-1/2 lg:w-2/5 flex justify-center items-center mb-6 md:mb-0"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative flex items-center justify-center">
                  {/* Loading state */}
                  {loading && currentSlide === index && (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center shadow-lg animate-pulse">
                      <Zap className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Lottie Animation with size constraints */}
                  {!loading && lottieData[index] && (
                    <Lottie
                      animationData={lottieData[index]}
                      loop={true}
                      autoplay={true}
                      className="w-full h-full"
                      style={{ 
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  )}
                  
                  {/* Fallback Icon if Lottie fails to load */}
                  {!loading && !lottieData[index] && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-white to-gray-50 flex items-center justify-center shadow-lg border border-white/80">
                        <div className={slide.accentColor}>
                          {slide.fallbackIcon}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Text content */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ 
                  x: currentSlide === index ? 0 : 30, 
                  opacity: currentSlide === index ? 1 : 0 
                }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left px-4 md:px-6 lg:px-8"
              >
                {/* Title */}
                <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${slide.textColor} mb-4 md:mb-6`}>
                  {slide.title}
                </h3>
                
                {/* Description */}
                <p className={`${slide.textColor}/80 text-base md:text-lg lg:text-xl leading-relaxed`}>
                  {slide.description}
                </p>
              </motion.div>
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
        {/* Dots indicator */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative w-2 h-2 rounded-full bg-gray-400/50 hover:bg-gray-600 transition-colors"
              aria-label={`Go to slide ${index + 1}`}
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
      </div>
    </div>
  );
}

// // src/app/components/Slideshow.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import {  MessageSquare, Smartphone, BarChart3, Cpu, Zap,} from 'lucide-react';
// import Lottie from 'lottie-react';

// // Define slide data with CORRECTED Lottie file paths
// const slides = [
//   {
//     id: 1,
//     title: "AI-Powered Conversations",
//     description: "Natural, human-like interactions that understand context and intent",
//     lottieFile: "/lotti/ai-chat.json", // Matches your public folder structure
//     fallbackIcon: <MessageSquare className="w-16 h-16" />,
//     color: "from-blue-50 to-cyan-50",
//     textColor: "text-blue-900",
//     accentColor: "text-blue-600"
//   },
//   {
//     id: 2,
//     title: "Multi-Channel Support",
//     description: "Seamlessly handle voice, chat, email, and social media interactions",
//     lottieFile: "/lotti/multi-channel.json", // Matches your public folder structure
//     fallbackIcon: <Smartphone className="w-16 h-16" />,
//     color: "from-purple-50 to-pink-50",
//     textColor: "text-purple-900",
//     accentColor: "text-purple-600"
//   },
//   {
//     id: 3,
//     title: "Real-Time Analytics",
//     description: "Monitor performance and gain insights with live dashboards",
//     lottieFile: "/lotti/analytics.json", // Matches your public folder structure
//     fallbackIcon: <BarChart3 className="w-16 h-16" />,
//     color: "from-green-50 to-emerald-50",
//     textColor: "text-green-900",
//     accentColor: "text-green-600"
//   },
//   {
//     id: 4,
//     title: "Enterprise Integration",
//     description: "Connect with your existing CRM, ERP, and business systems",
//     lottieFile: "/lotti/integration.json", // Matches your public folder structure
//     fallbackIcon: <Cpu className="w-16 h-16" />,
//     color: "from-amber-50 to-orange-50",
//     textColor: "text-amber-900",
//     accentColor: "text-amber-600"
//   }
// ];

// export function Slideshow() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPlaying] = useState(true);
//   const [lottieData, setLottieData] = useState<Array<any>>(Array(slides.length).fill(null));
//   const [loading, setLoading] = useState(true);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   // const prevSlide = () => {
//   //   setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   // };

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       nextSlide();
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   // Load Lottie animations with better error handling
//   useEffect(() => {
//     const loadLottieAnimations = async () => {
//       setLoading(true);
//       const loadedAnimations = [...lottieData];
      
//       const loadPromises = slides.map(async (slide, i) => {
//         try {
//           // Using direct fetch from public directory
//           const response = await fetch(slide.lottieFile);
//           if (response.ok) {
//             const data = await response.json();
//             loadedAnimations[i] = data;
//           } else {
//             console.warn(`Failed to load ${slide.lottieFile}: ${response.status}`);
//             loadedAnimations[i] = null;
//           }
//         } catch (error) {
//           console.error(`Error loading ${slide.lottieFile}:`, error);
//           loadedAnimations[i] = null;
//         }
//       });
      
//       await Promise.all(loadPromises);
//       setLottieData(loadedAnimations);
//       setLoading(false);
//     };

//     loadLottieAnimations();
//   }, []);

//   return (
//     <div className="relative w-full max-w-2xl mx-auto"> {/* Added max width constraint */}
//       {/* Slides container with responsive height */}
//       <div className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-lg">
//         {slides.map((slide, index) => (
//           <motion.div
//             key={slide.id}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{
//               opacity: currentSlide === index ? 1 : 0,
//               scale: currentSlide === index ? 1 : 0.95,
//               zIndex: currentSlide === index ? 10 : 0
//             }}
//             transition={{ duration: 0.7, ease: "easeInOut" }}
//             className={`absolute inset-0 ${slide.color} rounded-2xl`}
//           >
//             {/* Slide content with better responsive spacing */}
//             <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-4 md:p-6 lg:p-8">
//               {/* Animation/Icon Container */}
//               <motion.div
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ 
//                   y: currentSlide === index ? 0 : 30, 
//                   opacity: currentSlide === index ? 1 : 0 
//                 }}
//                 transition={{ delay: 0.2, duration: 0.5 }}
//                 className="w-full md:w-1/2 lg:w-2/5 flex justify-center items-center mb-6 md:mb-0"
//               >
//                 <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative flex items-center justify-center">
//                 {/* <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 relative flex items-center justify-center"> */}
//                   {/* Loading state */}
//                   {loading && currentSlide === index && (
//                     <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center shadow-lg animate-pulse">
//                       <Zap className="w-8 h-8 text-gray-400" />
//                     </div>
//                   )}
                  
//                   {/* Lottie Animation with size constraints */}
//                   {!loading && lottieData[index] && (
//                     <Lottie
//                       animationData={lottieData[index]}
//                       loop={true}
//                       autoplay={true} // Always autoplay when visible
//                       className="w-full h-full"
//                       style={{ 
//                         maxWidth: '100%',
//                         maxHeight: '100%'
//                       }}
//                     />
//                   )}
                  
//                   {/* Fallback Icon if Lottie fails to load */}
//                   {!loading && !lottieData[index] && (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-white to-gray-50 flex items-center justify-center shadow-lg border border-white/80">
//                         <div className={slide.accentColor}>
//                           {slide.fallbackIcon}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
              
//               {/* Text content */}
//               <motion.div
//                 initial={{ x: 30, opacity: 0 }}
//                 animate={{ 
//                   x: currentSlide === index ? 0 : 30, 
//                   opacity: currentSlide === index ? 1 : 0 
//                 }}
//                 transition={{ delay: 0.3, duration: 0.5 }}
//                 className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left px-4 md:px-6 lg:px-8"
//               >
//                 {/* Title */}
//                 <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${slide.textColor} mb-4 md:mb-6`}>
//                   {slide.title}
//                 </h3>
                
//                 {/* Description */}
//                 <p className={`${slide.textColor}/80 text-base md:text-lg lg:text-xl leading-relaxed`}>
//                   {slide.description}
//                 </p>
//               </motion.div>
//             </div>

//             {/* Background pattern */}
//             <div className="absolute inset-0 opacity-[0.03]">
//               <div className="absolute inset-0" style={{
//                 backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 1px)`,
//                 backgroundSize: '40px 40px'
//               }} />
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Navigation controls */}
//       <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
//         {/* Dots indicator */}
//         <div className="flex items-center gap-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className="relative w-2 h-2 rounded-full bg-gray-400/50 hover:bg-gray-600 transition-colors"
//               aria-label={`Go to slide ${index + 1}`}
//             >
//               {currentSlide === index && (
//                 <motion.div
//                   layoutId="activeDot"
//                   className="absolute inset-0 rounded-full bg-gray-800"
//                 />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Play/Pause button */}
        
//       </div>

//       {/* Navigation arrows */}
//       {/* <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all shadow-sm hover:shadow-md z-20"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="w-5 h-5 text-gray-700" />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all shadow-sm hover:shadow-md z-20"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="w-5 h-5 text-gray-700" />
//       </button> */}

//       {/* Progress bar */}
//       {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 z-10">
//         <motion.div
//           key={currentSlide}
//           initial={{ width: "0%" }}
//           animate={{ width: "100%" }}
//           transition={{ duration: 4, ease: "linear" }}
//           className="h-full bg-gray-600"
//           onAnimationComplete={() => {
//             if (isPlaying) nextSlide();
//           }}
//         />
//       </div> */}
//     </div>
//   );
// }