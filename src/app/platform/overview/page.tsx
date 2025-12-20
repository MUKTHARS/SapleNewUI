'use client';

import { motion } from 'framer-motion';
import { 
  // Zap, 
  Brain, 
  BarChart,
  Shield,
  GitBranch,
  Workflow,
  MessageSquare,
  Cpu,
  Users,
  // ChevronRight,
  Play,
  Server,
  Target,
  Sparkles,
  ArrowRight,
  // Cloud,
  Code,
  Eye,
  CheckCircle,
  // Rocket,
  ShieldCheck,
  Globe,
  // Database,
  Settings,
  Monitor
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const platformHighlights = [
  {
    title: "Zero-Code Studio",
    description: "Build sophisticated AI agents with our visual, drag-and-drop interface—no engineering required.",
    icon: <Workflow className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    stat: "10x faster development"
  },
  {
    title: "Enterprise-Ready",
    description: "SOC 2 Type II certified with enterprise-grade security, scalability, and 99.9% uptime SLA.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    stat: "Fortune 500 trusted"
  },
  {
    title: "Omnichannel AI",
    description: "Deploy consistent AI experiences across web chat, mobile apps, voice, and social platforms.",
    icon: <Globe className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    stat: "15+ channels supported"
  },
  {
    title: "Intelligent Analytics",
    description: "Real-time insights, sentiment analysis, and actionable recommendations to optimize performance.",
    icon: <BarChart className="w-6 h-6" />,
    color: "from-amber-500 to-orange-500",
    stat: "90% faster insights"
  }
];

// Adjusted angles for the desired layout:
// card1 (top): 90° (north)
// card2 (top left): 150°
// card3 (top right): 30°
// card4 (left): 210°
// card5 (right): -30° (330°)
// card6 (bottom left): 240°
// card7 (bottom right): 300°
const circularFlow = [
  { 
    stage: "Discover", 
    description: "From data to deployment with Zero Setup AI agents",
    icon: <Eye className="w-5 h-5" />,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-pink-500",
    angle: 90, // Top card (card1)
    delay: 0,
    moduleId: 0
  },
  { 
    stage: "Build", 
    description: "Create no-code AI agents in minutes",
    icon: <Brain className="w-5 h-5" />,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    angle: 150, // Top left (card2)
    delay: 0.1,
    moduleId: 0
  },
  { 
    stage: "Debug", 
    description: "Identify real-time issues as you build",
    icon: <Code className="w-5 h-5" />,
    color: "bg-cyan-500",
    gradient: "from-cyan-500 to-teal-500",
    angle: 30, // Top right (card3)
    delay: 0.2,
    moduleId: 1
  },
  { 
    stage: "Test", 
    description: "Ship reliable AI agents faster",
    icon: <Settings className="w-5 h-5" />,
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500",
    angle: 210, // Left (card4)
    delay: 0.3,
    moduleId: 1
  },
  { 
    stage: "Analyze", 
    description: "Drive continuous improvement of AI agents",
    icon: <BarChart className="w-5 h-5" />,
    color: "bg-amber-500",
    gradient: "from-amber-500 to-yellow-500",
    angle: -30, // Right (card5) - equivalent to 330°
    delay: 0.4,
    moduleId: 2
  },
  { 
    stage: "Measure", 
    description: "Actionable insights from real-time metrics",
    icon: <Monitor className="w-5 h-5" />,
    color: "bg-orange-500",
    gradient: "from-orange-500 to-red-500",
    angle: 240, // Bottom left (card6)
    delay: 0.5,
    moduleId: 2
  },
  { 
    stage: "Respond", 
    description: "Deliver grounded, precise answers with AgentC PAG",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "bg-red-500",
    gradient: "from-red-500 to-pink-500",
    angle: 300, // Bottom right (card7)
    delay: 0.6,
    moduleId: 3
  }
];

const coreModules = [
  {
    title: "Agent Studio",
    description: "Comprehensive environment for designing, training, and managing AI agents with version control.",
    icon: <Brain className="w-8 h-8" />,
    link: "/platform/studio",
    features: ["Visual Flow Builder", "Model Training", "A/B Testing", "Version Control"],
    flowStages: [0, 1] // Map to circularFlow indices
  },
  {
    title: "Integration Hub",
    description: "Connect with your entire tech stack—from CRM and ERP to custom APIs and legacy systems.",
    icon: <GitBranch className="w-8 h-8" />,
    link: "/platform/integrations",
    features: ["500+ Connectors", "Custom APIs", "Real-time Sync", "Event-driven"],
    flowStages: [2, 3] // Map to circularFlow indices
  },
  {
    title: "Analytics Suite",
    description: "Deep insights into agent performance, customer satisfaction, and business impact metrics.",
    icon: <BarChart className="w-8 h-8" />,
    link: "/platform/analytics",
    features: ["Real-time Dashboards", "Custom Reports", "Predictive Analytics", "ROI Tracking"],
    flowStages: [4, 5] // Map to circularFlow indices
  },
  {
    title: "Agent Assist",
    description: "AI copilot for human agents that suggests responses, automates tasks, and escalates when needed.",
    icon: <Users className="w-8 h-8" />,
    link: "/platform/agent-assist",
    features: ["Real-time Coaching", "Automation", "Knowledge Base", "Escalation"],
    flowStages: [6] // Map to circularFlow indices
  }
];

const enterpriseFeatures = [
  {
    title: "Multi-LLM Orchestration",
    description: "Intelligently route queries to GPT-4, Claude, Gemini, or custom models based on context and cost.",
    icon: <Cpu className="w-6 h-6" />,
    stats: ["96% accuracy", "70% cost savings"]
  },
  {
    title: "Advanced Security",
    description: "End-to-end encryption, role-based access, audit logs, and compliance with global standards.",
    icon: <Shield className="w-6 h-6" />,
    stats: ["SOC 2 Type II", "GDPR ready"]
  },
  {
    title: "Global Performance",
    description: "Deploy agents globally with local language support and region-specific compliance.",
    icon: <Globe className="w-6 h-6" />,
    stats: ["15 languages", "50+ regions"]
  },
  {
    title: "Scalable Infrastructure",
    description: "Auto-scaling infrastructure that handles millions of conversations with sub-second latency.",
    icon: <Server className="w-6 h-6" />,
    stats: ["99.9% uptime", "Millions TPS"]
  }
];

export default function PlatformOverviewPage() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const coreModulesRef = useRef<HTMLDivElement>(null);

  const handleFlowCardClick = (stageIndex: number) => {
    // Find which module this stage belongs to
    const clickedStage = circularFlow[stageIndex];
    if (clickedStage?.moduleId !== undefined) {
      setActiveModule(clickedStage.moduleId);
      
      // Scroll to core modules section with smooth animation
      setIsScrolling(true);
      setTimeout(() => {
        if (coreModulesRef.current) {
          coreModulesRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
        setIsScrolling(false);
      }, 100);
    }
  };

 const handleModuleHover = (moduleIndex: number) => {
  // When hovering over a module, highlight related flow stages
  const currentModule = coreModules[moduleIndex]; 
  if (currentModule?.flowStages?.length > 0) {
    // Highlight the first related stage
    setHoveredStage(currentModule.flowStages[0]);
  }
};

  const handleModuleLeave = () => {
    // Don't clear hoveredStage if it was set by clicking
    if (!isScrolling) {
      setHoveredStage(null);
    }
  };

  // Reset active module after 3 seconds
  useEffect(() => {
    if (activeModule !== null) {
      const timer = setTimeout(() => {
        setActiveModule(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeModule]);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Dark Theme Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-b from-gray-900 to-black">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Enterprise AI Platform</span>
            </div> */}
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              The Complete Platform for
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
                AI Agent Development
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Build, deploy, and scale intelligent AI agents across every customer touchpoint—with enterprise-grade security, 
              zero-code simplicity, and unparalleled performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">
                  <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
                    <span>Start Building Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/demo">
                  <button className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <span>Watch Platform Demo</span>
                    <Play className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dark Theme Platform Highlights */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Visual */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-2">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30 mb-6">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-white">Live Platform Preview</span>
                    </div>
                    <div className="text-4xl font-bold text-white">Visual AI Studio</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Highlights */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Speed & Scale</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Our platform combines enterprise-grade power with intuitive design, enabling teams of all sizes to 
                  deploy production-ready AI agents in days, not months.
                </p>
              </motion.div>

              <div className="space-y-6">
                {platformHighlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${highlight.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {highlight.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {highlight.title}
                          </h3>
                          <span className="text-sm font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 px-3 py-1 rounded-full">
                            {highlight.stat}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Light Theme Circular Flowchart Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <section className="text-4xl md:text-5xl font-bold text-black-900 mb-6">
              AI Agent Development & Deployment Lifecycle
            </section>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete journey from concept to production with our intuitive circular workflow
            </p>
          </motion.div>

{/* Circular Flowchart Container */}
<div className="relative h-[750px]">
  {/* Center Platform Hub with Glass Effect */}
  <div className="absolute inset-0 flex items-center justify-center z-20">
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="w-44 h-44 rounded-full bg-white/85 backdrop-blur-xl border-2 border-white/90 shadow-2xl flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            AgentC PAG
          </h3>
          <div className="h-px w-14 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-3"></div>
          <p className="text-xs text-gray-600">
            AI Platform
          </p>
        </div>
      </div>
    </motion.div>
  </div>

  {/* Heptagon Structure with Electric Animation */}
  <div className="absolute inset-0 flex items-center justify-center z-0"> {/* Changed to z-0 to be behind cards */}
    <svg className="w-full h-full max-w-2xl max-h-2xl" viewBox="0 0 600 600">
      {/* Main Heptagon - Dotted Line */}
      <polygon
        points="300,100 150,150 100,300 150,450 300,500 450,450 500,300 450,150" // Reversed points for clockwise
        fill="none"
        stroke="url(#heptagonGradient)"
        strokeWidth="3"
        strokeDasharray="12,12"
        className="opacity-60"
      />
      
      {/* Electric Pulse Animation - Traveling around heptagon CLOCKWISE */}
      <polygon
        points="300,100 150,150 100,300 150,450 300,500 450,450 500,300 450,150" // Reversed for clockwise
        fill="none"
        stroke="url(#electricPulse)"
        strokeWidth="4"
        strokeDasharray="12,12"
        strokeLinecap="round"
        className="opacity-80"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="24"
          dur="3s"
          repeatCount="indefinite"
          calcMode="linear"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </polygon>
      
      {/* Electric Glow Effect - Clockwise */}
      <polygon
        points="300,100 150,150 100,300 150,450 300,500 450,450 500,300 450,150" // Reversed for clockwise
        fill="none"
        stroke="url(#electricGlow)"
        strokeWidth="6"
        strokeDasharray="12,12"
        className="opacity-40"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="24"
          dur="2.5s"
          repeatCount="indefinite"
          calcMode="linear"
          begin="0.5s"
        />
      </polygon>
      
      {/* Electric Spark Particles traveling around CLOCKWISE */}
      <circle cx="300" cy="100" r="2" fill="#60A5FA">
        <animateMotion
          path="M300,100 L150,150 L100,300 L150,450 L300,500 L450,450 L500,300 L450,150 L300,100" // Reversed path
          dur="4s"
          repeatCount="indefinite"
          rotate="auto"
        />
        <animate
          attributeName="r"
          values="2;4;2"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.2;1;0.2"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      
      <circle cx="300" cy="100" r="1.5" fill="#8B5CF6">
        <animateMotion
          path="M300,100 L150,150 L100,300 L150,450 L300,500 L450,450 L500,300 L450,150 L300,100" // Reversed path
          dur="3.5s"
          repeatCount="indefinite"
          rotate="auto"
          begin="0.3s"
        />
        <animate
          attributeName="r"
          values="1.5;3;1.5"
          dur="1.2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.9;0.3"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </circle>
      
      <circle cx="300" cy="100" r="1" fill="#34D399">
        <animateMotion
          path="M300,100 L150,150 L100,300 L150,450 L300,500 L450,450 L500,300 L450,150 L300,100" // Reversed path
          dur="5s"
          repeatCount="indefinite"
          rotate="auto"
          begin="0.7s"
        />
        <animate
          attributeName="r"
          values="1;2.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.1;0.7;0.1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Center lines to each vertex - BEHIND cards */}
      {[
        {x: 300, y: 100},   // 0: Top
        {x: 150, y: 150},   // 1: Top-left (was Top-right)
        {x: 100, y: 300},   // 2: Left (was Right)
        {x: 150, y: 450},   // 3: Bottom-left (was Bottom-right)
        {x: 300, y: 500},   // 4: Bottom
        {x: 450, y: 450},   // 5: Bottom-right (was Bottom-left)
        {x: 500, y: 300}    // 6: Right (was Left)
      ].map((point, idx) => (
        <line
          key={idx}
          x1="300"
          y1="300"
          x2={point.x}
          y2={point.y}
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="8,8"
          className="opacity-15" 
        />
      ))}
      
      <defs>
        <linearGradient id="heptagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
        </linearGradient>
        
        <linearGradient id="electricPulse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="25%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="75%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        
        <linearGradient id="electricGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
          <stop offset="25%" stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
          <stop offset="75%" stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
        </linearGradient>
        
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" /> {/* Reduced opacity */}
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" /> {/* Reduced opacity */}
        </linearGradient>
      </defs>
    </svg>
  </div>

  {/* Heptagon Nodes - 7 corners */}
  <div className="absolute inset-0 flex items-center justify-center">
    {/* Perfect heptagon vertices with large spacing - Adjusted for clockwise orientation */}
    {circularFlow.map((stage, index) => {
      // Large radius for proper spacing
      const radius = 280;
      
      // 7 equally spaced angles for heptagon (360/7 ≈ 51.43°) - CLOCKWISE from top
      const baseAngle = -90; // Start from top
      const angleStep = 360 / 7;
      // Go clockwise (negative direction) for clockwise animation
      const angle = baseAngle - (index * angleStep);
      // const angleRad = (angle * Math.PI) / 180;
      
      // Adjust specific positions for better visual balance
      let adjustedAngle = angle;
      let adjustedRadius = radius;
      
      // Fine-tune each vertex for perfect heptagon shape (clockwise order)
      switch(index) {
        case 0: // Top
          adjustedAngle = -90;
          adjustedRadius = radius;
          break;
        case 1: // Top-left (clockwise from top)
          adjustedAngle = -90 - 51.43;
          adjustedRadius = radius + 10;
          break;
        case 2: // Left
          adjustedAngle = -90 - (51.43 * 2);
          adjustedRadius = radius + 15;
          break;
        case 3: // Bottom-left
          adjustedAngle = -90 - (51.43 * 3);
          adjustedRadius = radius + 10;
          break;
        case 4: // Bottom
          adjustedAngle = -90 - (51.43 * 4);
          adjustedRadius = radius;
          break;
        case 5: // Bottom-right
          adjustedAngle = -90 - (51.43 * 5);
          adjustedRadius = radius + 10;
          break;
        case 6: // Right
          adjustedAngle = -90 - (51.43 * 6);
          adjustedRadius = radius + 15;
          break;
      }
      
      const finalAngleRad = (adjustedAngle * Math.PI) / 180;
      
      // Calculate position on circle
      const centerX = Math.cos(finalAngleRad) * adjustedRadius;
      const centerY = Math.sin(finalAngleRad) * adjustedRadius;
      
      // Card dimensions for heptagon corners
      const cardWidth = 170; // w-[170px]
      const cardHeight = 150;
      
      // Additional fine-tuning for perfect corner placement
      let fineTuneX = 0;
      let fineTuneY = 0;
      
      // Adjust each corner position for perfect heptagon shape
      if (index === 0) { // Top
        fineTuneY = -5;
      } else if (index === 1) { // Top-left (clockwise)
        fineTuneX = -10;
        fineTuneY = -3;
      } else if (index === 2) { // Left
        fineTuneX = -15;
      } else if (index === 3) { // Bottom-left
        fineTuneX = -10;
        fineTuneY = 3;
      } else if (index === 4) { // Bottom
        fineTuneY = 5;
      } else if (index === 5) { // Bottom-right
        fineTuneX = 10;
        fineTuneY = 3;
      } else if (index === 6) { // Right
        fineTuneX = 15;
      }
      
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: stage.delay }}
          viewport={{ once: true }}
          className="absolute z-30 cursor-pointer"
          style={{
            left: `calc(50% + ${centerX + fineTuneX}px - ${cardWidth / 2}px)`,
            top: `calc(50% + ${centerY + fineTuneY}px - ${cardHeight / 2}px)`,
          }}
          onMouseEnter={() => setHoveredStage(index)}
          onMouseLeave={() => {
            if (!activeModule && !isScrolling) {
              setHoveredStage(null);
            }
          }}
          onClick={() => handleFlowCardClick(index)}
        >
          <div className="relative group">
            {/* Heptagon Corner Card - Clean design */}
            <div 
              className={`w-[170px] bg-white/90 backdrop-blur-xl rounded-xl p-4 border-2 border-white/95 shadow-xl transition-all duration-300 ${
                hoveredStage === index ? 'scale-110 shadow-2xl ring-2 ring-blue-300' : 'hover:scale-110 hover:shadow-2xl'
              } ${
                activeModule !== null && circularFlow.findIndex(s => s.moduleId === activeModule) === index 
                  ? 'ring-4 ring-blue-400 ring-opacity-50' 
                  : ''
              }`}
            >
              {/* Node Icon */}
              <div className={`w-9 h-9 ${stage.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                <div className="text-white">
                  {stage.icon}
                </div>
              </div>
              
              {/* Node Title */}
              <h3 className="text-sm font-bold text-gray-900 mb-2 text-center">
                {stage.stage}
              </h3>
              
              {/* Node Description */}
              <p className="text-xs text-gray-600 text-center leading-tight min-h-[2.5rem]">
                {stage.description}
              </p>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
</div>

          {/* Active stage indicator */}
          {hoveredStage !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 max-w-2xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/80">
                <div className={`w-3 h-3 ${circularFlow[hoveredStage].color} rounded-full`}></div>
                <span className="font-medium text-gray-900">{circularFlow[hoveredStage].stage}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">{circularFlow[hoveredStage].description}</span>
                {circularFlow[hoveredStage].moduleId !== undefined && (
                  <span className="text-xs text-blue-500 font-medium">
                    (Module: {coreModules[circularFlow[hoveredStage].moduleId]?.title})
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Light Theme Core Modules - With interaction */}
      <section ref={coreModulesRef} className="py-24 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 backdrop-blur-sm border border-blue-200 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Platform Architecture</span>
            </div>
            <section className="text-4xl md:text-5xl font-bold text-black-600 mb-6">
              Everything You Need in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">One Platform</span>
            </section>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four integrated modules that work together seamlessly to power your AI agent strategy.
            </p>
            
            {/* Active module indicator */}
            {activeModule !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-blue-700">
                  Showing: {coreModules[activeModule]?.title}
                </span>
                <button
                  onClick={() => setActiveModule(null)}
                  className="ml-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: activeModule === index ? 0 : index * 0.1 
                }}
                viewport={{ once: true }}
                className="group"
                onMouseEnter={() => handleModuleHover(index)}
                onMouseLeave={handleModuleLeave}
              >
                <Link href={module.link}>
                  <div className={`relative h-full rounded-2xl p-8 border-2 ${activeModule === index ? 'border-blue-300 bg-gradient-to-r from-blue-50/50 to-purple-50/50 ring-4 ring-blue-200 ring-opacity-30' : 'border-blue-100 bg-white/80'} backdrop-blur-sm hover:border-blue-300 hover:scale-[1.02] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl`}>
                    {/* Background glow with animation for active module */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 ${
                      activeModule === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity duration-500`} />
                    
                    {/* Active module pulse effect */}
                    {activeModule === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-pulse rounded-2xl" />
                    )}

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 border ${
                      activeModule === index ? 'border-blue-300' : 'border-blue-200'
                    } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`${activeModule === index ? 'text-blue-600' : 'text-blue-600'}`}>
                        {module.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {module.title}
                      {activeModule === index && (
                        <span className="ml-2 text-sm font-normal text-blue-600 animate-pulse">
                          ← Selected
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {module.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className={`w-4 h-4 ${activeModule === index ? 'text-green-600' : 'text-green-500'} flex-shrink-0`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover indicator */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent ${
                      activeModule === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity duration-300`} />
                    
                    {/* Related stages indicator */}
                    <div className="absolute top-4 right-4">
                      <div className="flex gap-1">
                        {module.flowStages?.map((stageIdx) => (
                          <div
                            key={stageIdx}
                            className={`w-2 h-2 rounded-full ${
                              hoveredStage === stageIdx || activeModule === index 
                                ? circularFlow[stageIdx]?.color 
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Click instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeModule !== null ? 0 : 1 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              💡 <span className="font-medium text-blue-600">Tip:</span> Click on any stage in the workflow above to highlight its corresponding platform module
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dark Theme Enterprise Capabilities */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Enterprise Demands</span>
              </h2>
              <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                Trusted by global enterprises, our platform delivers the security, reliability, and scalability 
                required for mission-critical deployments.
              </p>

              <div className="space-y-8">
                {enterpriseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <div className="text-amber-400">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 mb-3">
                        {feature.description}
                      </p>
                      <div className="flex gap-4">
                        {feature.stats.map((stat, idx) => (
                          <span key={idx} className="text-sm font-medium bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 px-3 py-1 rounded-full">
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-2">
                <div className="aspect-square bg-gradient-to-br from-amber-900/10 via-transparent to-orange-900/10 rounded-2xl flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30 mb-6">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-medium text-white">Enterprise Dashboard</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Active Agents", value: "2.4K", change: "+12%" },
                        { label: "Avg Response Time", value: "0.8s", change: "-25%" },
                        { label: "Customer Satisfaction", value: "94%", change: "+8%" },
                        { label: "Automation Rate", value: "87%", change: "+15%" },
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700">
                          <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                          <div className="text-xs text-gray-400">{metric.label}</div>
                          <div className="text-xs text-green-400 mt-1">{metric.change}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Light Theme CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative rounded-3xl bg-white border-2 border-blue-100 p-12 shadow-2xl">
              {/* Background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
              
              <div className="relative z-10">
                <section className="text-4xl md:text-5xl font-bold text-black mb-6">
  Start Building Today
</section>

                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                  Join thousands of teams using our platform to transform customer experiences with AI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/contact">
                      <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
                        <span>Get Started Free</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/demo">
                      <button className="group inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold border border-gray-800 hover:bg-gray-800 transition-all duration-300">
                        <span>Schedule a Demo</span>
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </Link>
                  </motion.div>
                </div>
                
                <p className="text-sm text-gray-500 mt-8">
                  No credit card required • Free 14-day trial • Enterprise support available
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}