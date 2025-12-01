// src/app/components/Carousel.tsx
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: "Customer Self-Service",
    description: "AI-powered solutions that handle customer inquiries autonomously."
  },
  {
    title: "Agent Assist",
    description: "Real-time support for your human agents to enhance productivity."
  }
];

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="overflow-hidden">
        <div className="whitespace-nowrap transition-transform duration-300"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="inline-block w-full whitespace-normal px-4">
              <h3 className="text-2xl font-semibold mb-4">{slide.title}</h3>
              <p className="text-gray-600">{slide.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-color' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}