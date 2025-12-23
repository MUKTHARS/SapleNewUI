'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle, Shield, Zap, Clock, TrendingUp, Lock } from 'lucide-react';

export default function BFSIPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  return (
    <div className="min-h-screen bg-black">
{/* 1. Top Video Section - Split Layout */}
<section className="relative min-h-[70vh] md:min-h-[80vh] overflow-hidden pt-16 md:pt-20">
  <div className="max-w-7xl mx-auto px-4 h-full">
    <div className="grid lg:grid-cols-2 gap-8 items-center h-full py-10 md:py-0">
      {/* Left Side - Text Content */}
      <div className="relative z-10 mt-4 md:mt-0">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-white">AI Solutions for BFSI</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
          Transform BFSI with
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            AI-Powered Automation
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
          Deliver 24/7 instant banking service with human-like AI agents across 35+ channels. 
          Secure, scalable, and enterprise-ready.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
            Request Demo
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-all duration-300">
            Download Brochure
          </button>
        </div>
      </div>

      {/* Right Side - Video Container */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl mt-8 md:mt-0">
        {/* Video Background with fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-gray-900/50 to-purple-900/30">
          <video
            key="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadedData={() => setIsVideoLoaded(true)}
            onCanPlay={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(false)}
            style={{
              filter: 'brightness(1.05) contrast(1.1) saturate(1.1)'
            }}
          >
            <source src="/videos/Start.mp4" type="video/mp4" />
            <source src="/videos/video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient overlay for better video visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10" />
        </div>
        
        {/* Fallback if video doesn't load */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 text-center">Loading AI demo video...</p>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
      {/* 2. Stats Section - Second Component */}
<section className="py-20 bg-gradient-to-b from-black to-gray-900">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Side - Image */}
      <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
        <Image
          src="/images/bf5.avif"
          alt="BFSI AI Performance Dashboard"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Stats */}
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold text-white">1300+</div>
              <div className="text-sm text-gray-300">Enterprises Trusted</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="text-2xl font-bold text-white">&lt;1%</div>
              <div className="text-sm text-gray-300">Hallucination Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Stats Content */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Boost your ROI with leading AI
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl">
          Real results from BFSI implementations. Trusted by 1300+ enterprises worldwide.
        </p>
        
        <div className="grid grid-cols-2 gap-6">
          {[
            { value: '90%', label: 'automation of financial queries', icon: <TrendingUp className="w-6 h-6" /> },
            { value: '40%', label: 'increase in customer satisfaction', icon: <Zap className="w-6 h-6" /> },
            { value: '60%', label: 'reduction in operational costs', icon: <Shield className="w-6 h-6" /> },
            { value: '50%', label: 'boost in banking agent productivity', icon: <Clock className="w-6 h-6" /> },
          ].map((stat, index) => (
            <div key={index} className="group p-6 rounded-xl bg-gradient-to-b from-gray-900/30 to-gray-900/10 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                  <div className="text-cyan-400">
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Metrics */}
        <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-900/10 border border-gray-800">
          <div className="flex flex-wrap gap-8 justify-between">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">35+</div>
              <div className="text-gray-400 text-sm">Channels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">135+</div>
              <div className="text-gray-400 text-sm">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-gray-400 text-sm">Service</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 3. Features Section - Alternating Layout */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Drive service excellence in BFSI
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Where AI efficiency meets human-like empathy
            </p>
          </div>

          {/* Feature 1: Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
              <Image
                src="/images/bf1.avif"
                alt="No-code AI platform"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Fast Deployment</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Go live 2x faster with 150+ prebuilt templates
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Deploy Generative AI-driven banking agents in seconds with our no-code platform. 
                No coding or NLP training required. Achieve 60% lower operational costs with 100+ 
                out-of-the-box integrations.
              </p>
              <ul className="space-y-4">
                {['No-code platform', '150+ prebuilt templates', '100+ CRM integrations', '60% lower operational costs'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2: Image Right, Content Left */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 lg:flex-row-reverse">
            <div className="lg:order-2 relative h-[400px] rounded-2xl overflow-hidden border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              <Image
                src="/images/bf2.avif"
                alt="Voice AI banking"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full mb-6 border border-purple-500/20">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Voice AI</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Drive meaningful interactions with voice AI
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Build customer connections with human-like conversations using voice AI agents 
                capable of language switching and interruption handling. Handle sensitive scenarios 
                like card blocking and fraud alerts with empathy.
              </p>
              <ul className="space-y-4">
                {['Human-like voice conversations', 'Language switching', 'Interruption handling', 'Empathy-driven responses'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3: Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
              <Image
                src="/images/bf3.avif"
                alt="24/7 Banking"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full mb-6 border border-green-500/20">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">24/7 Service</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Trim wait times with anytime, anywhere banking
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Deliver round-the-clock customer service beyond banking hours. Handle FAQs 
                related to interest rates, loan eligibility, account opening, policy updates, 
                and cancellations across all channels.
              </p>
              <ul className="space-y-4">
                {['24/7 availability', 'Multi-channel support', 'Instant FAQ resolution', 'Reduced wait times'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 4: Image Right, Content Left */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 lg:flex-row-reverse">
            <div className="lg:order-2 relative h-[400px] rounded-2xl overflow-hidden border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10" />
              <Image
                src="/images/bf4.avif"
                alt="Banking Security"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full mb-6 border border-amber-500/20">
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Enterprise Security</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Gain unmatched confidence with enterprise-grade security
              </h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
  ISO certified, HIPAA, SOC2, GDPR, and PDPA compliant. Your data&apos;s privacy 
  and security are our top priority with TLS 1.3 encryption, AES 256 at rest, 
  and comprehensive vulnerability management.
</p>
              <ul className="space-y-4">
                {['ISO certified', 'GDPR/HIPAA compliant', 'TLS 1.3 encryption', 'Regular pentests'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Success Story Section (Unchanged from your previous version) */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30 mb-6">
              <span className="text-blue-400 font-medium">Success Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">A Leading Bank Saves 51% OPEX with Saple.AI</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <div className="text-6xl text-gray-700 mb-4">&quot;</div>
             <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
  The ease of using Saple.AI&apos;s low-code platform enabled us to quickly scale customer self-serve options, allowing efficient query resolution for clients.
</blockquote>
              <div>
                <div className="text-xl font-bold text-white">Joanna J Perez</div>
                <div className="text-gray-400">AVP – Self-Service Channels and Bots Head, UnionBank of Philippines</div>
                <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">51%</div>
                  <div className="text-gray-400">YoY reduction in AI agent OPEX</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-8">Key Results Achieved</h3>
              <div className="space-y-6">
                {[
                  { metric: 'Monthly AI Agent Users', before: '28k', after: '120k', increase: '329%' },
                  { metric: 'Operational Cost for AI Agent', before: '$100k', after: '$49k', reduction: '51%' },
                  { metric: 'Migration Time', before: '6 months', after: '3 months', improvement: '50% faster' },
                  { metric: 'Customer Satisfaction', before: '78%', after: '92%', improvement: '+14 pts' },
                ].map((item, index) => (
                  <div key={index} className="p-6 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-900/10 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-lg font-semibold text-white">{item.metric}</div>
                      <div className="px-3 py-1 bg-green-500/20 rounded-full">
                        <span className="text-green-400 text-sm font-medium">{item.increase} {item.metric.includes('Cost') ? 'reduction' : 'increase'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <div className="text-sm text-gray-400">Before</div>
                        <div className="text-2xl font-bold text-gray-300">{item.before}</div>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" 
                            style={{ width: item.metric.includes('Cost') ? '49%' : '100%' }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">After</div>
                        <div className="text-2xl font-bold text-white">{item.after}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cut Service Costs, Boost Resolutions, Drive Revenue
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Discover how Saple.AI can transform your BFSI operations with secure, scalable AI solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
              Request a Demo
            </button>
            <button className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 transition-all duration-300">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}