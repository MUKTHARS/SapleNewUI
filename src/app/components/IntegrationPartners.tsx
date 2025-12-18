'use client';

import { motion, useMotionValue, useTransform, animate, AnimatePresence, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
// import Logo from './saple-logo.jpeg';
import WordPress from './WordPress.png';
import Shopify from './Shopify.png';
import Webflow from './webflow.svg';
import Wix from './Wix.png';
import Squarespace from './squarespace.png';
import Html5 from './HTML5.png';
import ReactLogo from './React.webp';
import Vue from './Vue.png';
import Angular from './Angular.png';

interface Integration {
    name: string;
    logo: string;
    x: number;
    y: number;
    color: string;
    scriptType: string;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedX: number;
    speedY: number;
}

const integrations: Integration[] = [
    { name: 'WordPress', logo: WordPress, x: 0.2, y: 0.3, color: '#21759B', scriptType: 'Plugin or Theme' },
    { name: 'Shopify', logo: Shopify, x: 0.8, y: 0.2, color: '#7AB55C', scriptType: 'Theme Liquid' },
    { name: 'Webflow', logo: Webflow, x: 0.1, y: 0.7, color: '#000000', scriptType: 'Custom Code' },
    { name: 'Wix', logo: Wix, x: 0.9, y: 0.6, color: '#FAAD4D', scriptType: 'Custom Code' },
    { name: 'Squarespace', logo: Squarespace, x: 0.7, y: 0.8, color: '#222222', scriptType: 'Code Injection' },
    { name: 'HTML Websites', logo: Html5, x: 0.3, y: 0.9, color: '#E44D26', scriptType: 'Direct Embed' },
    { name: 'React Apps', logo: ReactLogo, x: 0.4, y: 0.1, color: '#61DAFB', scriptType: 'Component' },
    { name: 'Vue.js', logo: Vue, x: 0.7, y: 0.4, color: '#4FC08D', scriptType: 'Component' },
    { name: 'Angular', logo: Angular, x: 0.3, y: 0.5, color: '#DD0031', scriptType: 'Component' },
];

const generateParticles = (count: number, width: number, height: number): Particle[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 3,
        opacity: 0.2 + Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
    }));
};

const CentralLogo = ({
    energyPulse,
    pulseOpacity
}: {
    energyPulse: MotionValue<number>;
    pulseOpacity: MotionValue<number>;
}) => (
    <motion.div className="absolute z-20" whileHover={{ scale: 1.1 }}>
        <div className="relative w-32 h-32 md:w-40 md:h-40">
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    scale: useTransform(energyPulse, [0, 1], [1, 1.3]),
                    opacity: pulseOpacity
                }}
            />
            <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                    scale: useTransform(energyPulse, [0, 1], [1, 1.5]),
                    opacity: pulseOpacity
                }}
            />
            <div className="relative w-full h-full">
                {/* <Image
          src={Logo}
          alt="Saple AI"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        /> */}
                <div style={{ fontSize: '32px', padding: '50px 0 0 20px' }}>saple.ai</div>
            </div>
        </div>
    </motion.div>
);

const IntegrationItem = ({
    integration,
    dimensions,
    hoveredItem,
    setHoveredItem
}: {
    integration: Integration,
    dimensions: { width: number, height: number },
    hoveredItem: string | null,
    setHoveredItem: (name: string | null) => void
}) => {
    const isActive = hoveredItem === integration.name;
    const posX = integration.x * dimensions.width;
    const posY = integration.y * dimensions.height;
    console.log(`${integration.name}=M ${posX} ${posY} L ${dimensions.width / 2} ${dimensions.height / 2}`)
    return (
        <motion.div
            className="absolute z-10 cursor-pointer"
            style={{
                x: posX - dimensions.width / 2,
                y: posY - dimensions.height / 2,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: 1,
                scale: isActive ? 1.3 : 1,
                transition: { type: "spring", damping: 10 }
            }}
            whileHover={{
                scale: 1.3,
                transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredItem(integration.name)}
            onHoverEnd={() => setHoveredItem(null)}
        >
            <motion.div
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl p-3 md:p-4 backdrop-blur-sm"
                style={{
                    backgroundColor: `rgba(255, 255, 255, ${isActive ? 0.3 : 0.15})`,
                    boxShadow: isActive
                        ? `0 0 25px ${integration.color}80, inset 0 0 15px rgba(255,255,255,0.5)`
                        : `0 0 15px rgba(255,255,255,0.2)`,
                    border: `1px solid ${isActive ? integration.color : 'rgba(255,255,255,0.3)'}`
                }}
            >
                {isActive && (
                    <>
                        <motion.div
                            className="absolute -z-10 inset-0 rounded-xl md:rounded-2xl"
                            style={{
                                backgroundColor: integration.color,
                                filter: 'blur(15px)'
                            }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.3, 0],
                                scale: [1, 1.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        />
                        <svg
                            className="absolute top-1/2 left-1/2 pointer-events-none -z-20"
                            style={{
                                transform: 'translate(-50%, -50%)',
                                width: `${dimensions.width}px`,
                                height: `${dimensions.height}px`,
                            }}
                        >
                            <motion.path
                                // d={`M ${dimensions.width / 2} ${dimensions.height / 2} L ${posX} ${posY}`}
                                stroke={integration.color}
                                strokeWidth={1}
                                strokeDasharray="8 4"
                                initial={{ strokeDashoffset: 12 }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                fill="none"
                            />
                        </svg>
                    </>
                )}
                <Image
                    src={integration.logo}
                    alt={integration.name}
                    fill
                    className="object-contain drop-shadow-lg"
                />
            </motion.div>
        </motion.div>
    );
};


export function IntegrationPartners() {
    // State hooks
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isScriptCopied, setIsScriptCopied] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 1000, height: 700 });
    const [particles, setParticles] = useState<Particle[]>([]);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);

    // Motion values
    const energyPulse = useMotionValue<number>(0);
    const pulseOpacity = useTransform(energyPulse, [0, 1], [0.1, 0.4]);

    // Memoized values
    const initialParticles = useMemo(() =>
        generateParticles(50, dimensions.width, dimensions.height),
        [dimensions]
    );

    // Callbacks
    const copyScriptToClipboard = useCallback(() => {
        const script = `<script>
  document.addEventListener("DOMContentLoaded", function() {
    var w = window.innerWidth;
    var i = document.createElement("iframe");
    i.src = "//your-trained-bot-access-src";
    i.style.position = "absolute";
    i.style.bottom = "0px";
    i.style.right = "0px";
    i.style.zIndex = "999";
    i.style.border = "none";
    document.body.appendChild(i);
    const c = i.contentWindow;
    window.addEventListener("message", function(e) {
      if (e.data.width && e.data.height) {
        w >= 600 ? i.width = e.data.width : i.width = '400px';
        i.height = e.data.height;
      }
    });
  });
</script>`;
        navigator.clipboard.writeText(script);
        setIsScriptCopied(true);
        setTimeout(() => setIsScriptCopied(false), 2000);
    }, []);

    // Effects
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setParticles(initialParticles);
        const pulseAnimation = animate(energyPulse, 1, {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        });
        return () => pulseAnimation.stop();
    }, [energyPulse, initialParticles]);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (dimensions.width > 0 && dimensions.height > 0) {
            const interval = setInterval(() => {
                setParticles(prev => prev.map(p => ({
                    ...p,
                    x: (p.x + p.speedX + dimensions.width) % dimensions.width,
                    y: (p.y + p.speedY + dimensions.height) % dimensions.height,
                    opacity: 0.2 + Math.random() * 0.3
                })));
            }, 50);
            return () => clearInterval(interval);
        }
    }, [dimensions]);

    if (!isClient) {
        return (
            <section className="py-20 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="h-[600px] md:h-[700px] w-full flex items-center justify-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100/20 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-green-100/20 blur-3xl"></div>
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                   <motion.h2
  className="text-4xl md:text-5xl font-bold mb-6 !text-black !bg-none !text-opacity-100"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
>
  Universal Script Integration
</motion.h2>

                    <motion.p
                        className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Embed our AI agent on any platform that supports JavaScript
                    </motion.p>
                </motion.div>

                <div
                    ref={containerRef}
                    className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center overflow-hidden"
                >
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full bg-gradient-to-br from-blue-400/30 to-green-400/30"
                            style={{
                                width: particle.size,
                                height: particle.size,
                                left: particle.x,
                                top: particle.y,
                                opacity: particle.opacity
                            }}
                            animate={{
                                opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    ))}

                    <CentralLogo energyPulse={energyPulse} pulseOpacity={pulseOpacity} />

                    <AnimatePresence>
                        {integrations.map(integration => (
                            <IntegrationItem
                                key={integration.name}
                                integration={integration}
                                dimensions={dimensions}
                                hoveredItem={hoveredItem}
                                setHoveredItem={setHoveredItem}
                            />
                        ))}
                    </AnimatePresence>

                    {hoveredItem && (
                        <svg
                            className="absolute inset-0 pointer-events-none"
                            width="100%"
                            height="100%"
                        >
                            {integrations
                                .filter(integration => integration.name !== hoveredItem)
                                .map((integration) => {
                                    const startX = integrations.find(i => i.name === hoveredItem)!.x * dimensions.width;
                                    const startY = integrations.find(i => i.name === hoveredItem)!.y * dimensions.height;
                                    const endX = integration.x * dimensions.width;
                                    const endY = integration.y * dimensions.height;

                                    return (
                                        <motion.path
                                            key={`${hoveredItem}-${integration.name}`}
                                            d={`M ${startX} ${startY} L ${endX} ${endY}`}
                                            stroke="rgba(255, 255, 255, 0.1)"
                                            strokeWidth={1}
                                            strokeDasharray="8 4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.3 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    );
                                })}
                        </svg>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-20 max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-r from-blue-600/5 to-green-600/5 p-0.5 rounded-2xl md:rounded-3xl shadow-lg">
                        <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 relative overflow-hidden">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                                One-Step Integration
                            </h3>
                            <p className="text-lg md:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8 md:mb-10">
                                Add this script to your website to enable the Saple AI agent
                            </p>

                            <div className="relative">
                                <motion.button
                                    onClick={copyScriptToClipboard}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`absolute -top-4 right-4 px-4 py-2 rounded-lg text-sm font-medium flex items-center z-10 ${isScriptCopied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                                        } shadow-md`}
                                >
                                    {isScriptCopied ? (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                                            </svg>
                                            Copy Script
                                        </>
                                    )}
                                </motion.button>

                                <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                                    <div className="p-4 md:p-6 text-xs md:text-sm text-gray-200 font-mono overflow-x-auto">
                                        <pre className="whitespace-pre-wrap">
                                            <code>
                                                {`<script>\n`}
                                                {`  document.addEventListener("DOMContentLoaded", function() {\n`}
                                                {`    var w = window.innerWidth;\n`}
                                                {`    var i = document.createElement("iframe");\n`}
                                                {`    i.src = "//your-trained-bot-access-src";\n`}
                                                {`    i.style.position = "absolute";\n`}
                                                {`    i.style.bottom = "0px";\n`}
                                                {`    i.style.right = "0px";\n`}
                                                {`    i.style.zIndex = "999";\n`}
                                                {`    i.style.border = "none";\n`}
                                                {`    document.body.appendChild(i);\n`}
                                                {`    const c = i.contentWindow;\n`}
                                                {`    window.addEventListener("message", function(e) {\n`}
                                                {`      if (e.data.width && e.data.height) {\n`}
                                                {`        w >= 600 ? i.width = e.data.width : i.width = '400px';\n`}
                                                {`        i.height = e.data.height;\n`}
                                                {`      }\n`}
                                                {`    });\n`}
                                                {`  });\n`}
                                                {`</script>`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid sm:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h5 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                        Platform-Specific Instructions
                                    </h5>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span><strong>WordPress:</strong> Add to theme footer.php or use a plugin</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span><strong>Shopify:</strong> Paste in theme.liquid before closing body tag</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span><strong>Webflow:</strong> Add to Project Settings &gt; Custom Code</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span><strong>Wix:</strong> Use Custom Code element in Editor</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h5 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Key Features
                                    </h5>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Works with all major CMS platforms</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Compatible with JavaScript frameworks</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>Automatically responsive on all devices</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>No performance impact</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}