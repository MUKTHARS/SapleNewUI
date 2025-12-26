// src/app/products/ai-agents/MultilingualSupportSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Globe, Flag, Languages, Globe2 } from 'lucide-react';

export function MultilingualSupportSection() {
  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'FR', name: 'French', flag: '🇫🇷' },
    { code: 'DE', name: 'German', flag: '🇩🇪' },
    { code: 'JA', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ZH', name: 'Chinese', flag: '🇨🇳' },
    { code: 'AR', name: 'Arabic', flag: '🇸🇦' },
    { code: 'HI', name: 'Hindi', flag: '🇮🇳' },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Globe className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Multilingual Support</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Speak your customers&apos; language
            </h2>
            
            <p className="text-gray-300 leading-relaxed">
              Serve customers globally with multilingual AI Agents that understand regional nuance, 
              cultural context, and regulatory requirements. Saple AI enables enterprises to expand 
              across markets while delivering consistent, high-quality experiences at scale—without 
              duplicating effort.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-gray-300">Cultural Adaptation</span>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-gray-300">Regional Nuance</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800">
              <div className="grid grid-cols-4 gap-4">
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="text-2xl mb-2">{lang.flag}</div>
                    <div className="text-sm font-medium text-white">{lang.code}</div>
                    <div className="text-xs text-gray-400">{lang.name}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Globe2 className="w-4 h-4" />
                  <span className="text-sm">+50 languages supported</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}