'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  BarChart,
  Shield,
  // GitBranch,
  Workflow,
  MessageSquare,
  Cpu,
  // Users,
  Play,
  Server,
  Target,
  Sparkles,
  ArrowRight,
  // Code,
  // Eye,
  CheckCircle,
  ShieldCheck,
  Globe,
  // Settings,
  // Monitor,
  Search,
  TestTube2,
  Gauge,
  AlertCircle,
  // Zap,
  // FileText,
  // CpuChip,
  // Users2,
  // TargetIcon,
  // FlaskConical,
  ChartNoAxesCombined,
  // Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const platformHighlights = [
  {
    title: "Zero-Code Studio",
    description: "Build sophisticated AI agents with our visual, drag-and-drop interface—no engineering required.",
    icon: <Workflow className="w-6 h-6" />,
    color: "from-blue-600 to-sky-500",
    stat: "10x faster development"
  },
  {
    title: "Enterprise-Ready",
    description: "SOC 2 Type II certified with enterprise-grade security, scalability, and 99.9% uptime SLA.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "from-emerald-600 to-green-500",
    stat: "Fortune 500 trusted"
  },
  {
    title: "Omnichannel AI",
    description: "Deploy consistent AI experiences across web chat, mobile apps, voice, and social platforms.",
    icon: <Globe className="w-6 h-6" />,
    color: "from-violet-600 to-purple-500",
    stat: "15+ channels supported"
  },
  {
    title: "Intelligent Analytics",
    description: "Real-time insights, sentiment analysis, and actionable recommendations to optimize performance.",
    icon: <BarChart className="w-6 h-6" />,
    color: "from-amber-600 to-orange-500",
    stat: "90% faster insights"
  }
];

// Human-made gradient colors - softer, more natural transitions
const circularFlow = [
  { 
    stage: "Discover", 
    description: "From data to deployment with Zero Setup AI agents",
    icon: <Search className="w-5 h-5" />,
    color: "bg-gradient-to-br from-indigo-400 via-purple-400 to-fuchsia-400",
    gradient: "from-indigo-100 via-purple-50 to-fuchsia-50",
    angle: 90,
    delay: 0,
    moduleId: 0
  },
  { 
    stage: "Build", 
    description: "Create no-code AI agents in minutes",
    icon: <Brain className="w-5 h-5" />,
    color: "bg-gradient-to-br from-blue-400 via-sky-400 to-cyan-400",
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
    angle: 150,
    delay: 0.1,
    moduleId: 0
  },
  { 
    stage: "Debug", 
    description: "Identify real-time issues as you build",
    icon: <AlertCircle className="w-5 h-5" />,
    color: "bg-gradient-to-br from-teal-400 via-emerald-400 to-green-400",
    gradient: "from-teal-50 via-emerald-50 to-green-50",
    angle: 30,
    delay: 0.2,
    moduleId: 1
  },
  { 
    stage: "Test", 
    description: "Ship reliable AI agents faster",
    icon: <TestTube2 className="w-5 h-5" />,
    color: "bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400",
    gradient: "from-amber-50 via-yellow-50 to-orange-50",
    angle: 210,
    delay: 0.3,
    moduleId: 1
  },
  { 
    stage: "Analyze", 
    description: "Drive continuous improvement of AI agents",
    icon: <ChartNoAxesCombined className="w-5 h-5" />,
    color: "bg-gradient-to-br from-rose-400 via-pink-400 to-red-400",
    gradient: "from-rose-50 via-pink-50 to-red-50",
    angle: -30,
    delay: 0.4,
    moduleId: 2
  },
  { 
    stage: "Measure", 
    description: "Actionable insights from real-time metrics",
    icon: <Gauge className="w-5 h-5" />,
    color: "bg-gradient-to-br from-violet-400 via-purple-400 to-indigo-400",
    gradient: "from-violet-50 via-purple-50 to-indigo-50",
    angle: 240,
    delay: 0.5,
    moduleId: 2
  },
  { 
    stage: "Respond", 
    description: "Deliver grounded, precise answers with AgentC PAG",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400",
    gradient: "from-sky-50 via-blue-50 to-indigo-50",
    angle: 300,
    delay: 0.6,
    moduleId: 3
  }
];

// All 7 interactive cards with human-made gradient colors and black icons
const interactiveCards = [
  {
    id: 0,
    title: "Discover Module",
    subtitle: "Data Intelligence & Insights",
    description: "Automatically discover patterns, anomalies, and opportunities in your data with zero setup. Our AI-powered discovery engine analyzes your existing data sources to recommend optimal agent configurations.",
    icon: <Search className="w-8 h-8 text-gray-900" />,
    color: "from-indigo-50 via-purple-50/80 to-fuchsia-50/60",
    borderColor: "border-indigo-200/50",
    features: [
      "Zero Setup Data Ingestion",
      "Pattern Recognition AI",
      "Automated Insights Generation",
      "Multi-source Data Integration"
    ],
    metrics: [
      { label: "Setup Time", value: "0 hours" },
      { label: "Accuracy", value: "98%" },
      { label: "Data Sources", value: "50+" }
    ],
    link: "/platform/discover"
  },
  {
    id: 1,
    title: "Build Studio",
    subtitle: "Visual AI Agent Creation",
    description: "Create sophisticated AI agents without writing a single line of code. Our drag-and-drop interface supports complex workflows, decision trees, and multi-model orchestration.",
    icon: <Brain className="w-8 h-8 text-gray-900" />,
    color: "from-blue-50 via-sky-50/80 to-cyan-50/60",
    borderColor: "border-blue-200/50",
    features: [
      "Drag & Drop Interface",
      "Multi-Model Orchestration",
      "Real-time Collaboration",
      "Version Control"
    ],
    metrics: [
      { label: "Build Speed", value: "10x Faster" },
      { label: "Complexity", value: "No-Code" },
      { label: "Team Size", value: "Unlimited" }
    ],
    link: "/platform/build"
  },
  {
    id: 2,
    title: "Debug Center",
    subtitle: "Real-time Issue Resolution",
    description: "Identify and fix issues in real-time with our comprehensive debugging tools. Monitor agent performance, track conversation flows, and pinpoint problems instantly.",
    icon: <AlertCircle className="w-8 h-8 text-gray-900" />,
    color: "from-teal-50 via-emerald-50/80 to-green-50/60",
    borderColor: "border-emerald-200/50",
    features: [
      "Real-time Error Tracking",
      "Conversation Flow Analysis",
      "Performance Monitoring",
      "Automated Testing"
    ],
    metrics: [
      { label: "Issue Resolution", value: "90% Faster" },
      { label: "Uptime", value: "99.9%" },
      { label: "Test Coverage", value: "100%" }
    ],
    link: "/platform/debug"
  },
  {
    id: 3,
    title: "Testing Suite",
    subtitle: "Comprehensive Quality Assurance",
    description: "Ensure your AI agents perform flawlessly in production with our comprehensive testing suite. Run A/B tests, load tests, and security audits all in one place.",
    icon: <TestTube2 className="w-8 h-8 text-gray-900" />,
    color: "from-amber-50 via-yellow-50/80 to-orange-50/60",
    borderColor: "border-amber-200/50",
    features: [
      "A/B Testing Framework",
      "Load & Stress Testing",
      "Security Audits",
      "Compliance Checks"
    ],
    metrics: [
      { label: "Test Scenarios", value: "1000+" },
      { label: "Accuracy", value: "99.5%" },
      { label: "Compliance", value: "SOC 2" }
    ],
    link: "/platform/test"
  },
  {
    id: 4,
    title: "Analytics Hub",
    subtitle: "Advanced Performance Insights",
    description: "Gain deep insights into your AI agents' performance with advanced analytics. Track KPIs, user satisfaction, and business impact metrics in real-time.",
    icon: <ChartNoAxesCombined className="w-8 h-8 text-gray-900" />,
    color: "from-rose-50 via-pink-50/80 to-red-50/60",
    borderColor: "border-rose-200/50",
    features: [
      "Real-time Dashboards",
      "Custom KPI Tracking",
      "Predictive Analytics",
      "ROI Calculation"
    ],
    metrics: [
      { label: "Data Points", value: "1M+/day" },
      { label: "Report Speed", value: "Real-time" },
      { label: "Insight Accuracy", value: "95%" }
    ],
    link: "/platform/analytics"
  },
  {
    id: 5,
    title: "Measurement Center",
    subtitle: "Precision Metrics & Monitoring",
    description: "Measure every aspect of your AI agents' performance with precision metrics. Monitor response times, accuracy rates, and user satisfaction scores.",
    icon: <Gauge className="w-8 h-8 text-gray-900" />,
    color: "from-violet-50 via-purple-50/80 to-indigo-50/60",
    borderColor: "border-violet-200/50",
    features: [
      "Custom Metric Builder",
      "Real-time Alerts",
      "Performance Benchmarks",
      "Trend Analysis"
    ],
    metrics: [
      { label: "Metrics Tracked", value: "200+" },
      { label: "Alert Speed", value: "< 1s" },
      { label: "Data Retention", value: "2 years" }
    ],
    link: "/platform/measure"
  },
  {
    id: 6,
    title: "Response Engine",
    subtitle: "Intelligent Answer Generation",
    description: "Power your AI agents with our advanced response engine that delivers accurate, context-aware answers using AgentC PAG technology.",
    icon: <MessageSquare className="w-8 h-8 text-gray-900" />,
    color: "from-sky-50 via-blue-50/80 to-indigo-50/60",
    borderColor: "border-sky-200/50",
    features: [
      "Context-Aware Responses",
      "Multi-language Support",
      "Real-time Learning",
      "Feedback Integration"
    ],
    metrics: [
      { label: "Response Accuracy", value: "96%" },
      { label: "Languages", value: "15+" },
      { label: "Response Time", value: "< 1s" }
    ],
    link: "/platform/respond"
  }
];

// const coreModules = [
//   {
//     title: "Agent Studio",
//     description: "Comprehensive environment for designing, training, and managing AI agents with version control.",
//     icon: <Brain className="w-8 h-8" />,
//     link: "/platform/studio",
//     features: ["Visual Flow Builder", "Model Training", "A/B Testing", "Version Control"],
//     flowStages: [0, 1]
//   },
//   {
//     title: "Integration Hub",
//     description: "Connect with your entire tech stack—from CRM and ERP to custom APIs and legacy systems.",
//     icon: <GitBranch className="w-8 h-8" />,
//     link: "/platform/integrations",
//     features: ["500+ Connectors", "Custom APIs", "Real-time Sync", "Event-driven"],
//     flowStages: [2, 3]
//   },
//   {
//     title: "Analytics Suite",
//     description: "Deep insights into agent performance, customer satisfaction, and business impact metrics.",
//     icon: <BarChart className="w-8 h-8" />,
//     link: "/platform/analytics",
//     features: ["Real-time Dashboards", "Custom Reports", "Predictive Analytics", "ROI Tracking"],
//     flowStages: [4, 5]
//   },
//   {
//     title: "Agent Assist",
//     description: "AI copilot for human agents that suggests responses, automates tasks, and escalates when needed.",
//     icon: <Users className="w-8 h-8" />,
//     link: "/platform/agent-assist",
//     features: ["Real-time Coaching", "Automation", "Knowledge Base", "Escalation"],
//     flowStages: [6]
//   }
// ];

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
  const [activeStage, setActiveStage] = useState<number | null>(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const interactiveCardsRef = useRef<HTMLDivElement>(null);

  const handleFlowCardClick = (stageIndex: number) => {
    setActiveStage(stageIndex);
    
    setIsScrolling(true);
    setTimeout(() => {
      if (interactiveCardsRef.current) {
        interactiveCardsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
      setIsScrolling(false);
    }, 100);
  };

  // const handleModuleHover = (moduleIndex: number) => {
  //   const currentModule = coreModules[moduleIndex]; 
  //   if (currentModule?.flowStages?.length > 0) {
  //     setHoveredStage(currentModule.flowStages[0]);
  //   }
  // };

  // const handleModuleLeave = () => {
  //   if (!isScrolling) {
  //     setHoveredStage(null);
  //   }
  // };

  useEffect(() => {
    if (activeStage !== null) {
      const timer = setTimeout(() => {
        setActiveStage(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeStage]);

  const activeCard = activeStage !== null ? interactiveCards[activeStage] : interactiveCards[0];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Dark Theme Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-b from-gray-900 to-black">
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
                  <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
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
            <section className="text-4xl md:text-5xl font-bold text-grey-900 mb-6">
              AI Agent Development & Deployment Lifecycle
            </section>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete journey from concept to production with our intuitive circular workflow
            </p>
          </motion.div>

          {/* Circular Flowchart Container */}
          <div className="relative h-[750px] overflow-hidden">
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

            {/* Heptagon Structure with Electric Animation - BEHIND CARDS (z-index: 0) */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <svg className="w-full h-full max-w-2xl max-h-2xl" viewBox="0 0 600 600">
                {/* Main Heptagon - Dotted Line */}
                <polygon
                  points="300,100 150,150 100,300 150,450 300,500 450,450 500,300 450,150"
                  fill="none"
                  stroke="url(#heptagonGradient)"
                  strokeWidth="3"
                  strokeDasharray="12,12"
                  className="opacity-60"
                />
                
                {/* Electric Pulse Animation */}
                <polygon
                  points="300,100 150,150 100,300 150,450 300,500 450,450 500,300 450,150"
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
                
                {/* Electric Glow Effect */}
                <polygon
                  points="300,100 150,150 100,300 150,450 300,500 450,450 500,300 450,150"
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
                
                {/* Electric Spark Particles */}
                <circle cx="300" cy="100" r="2" fill="#60A5FA">
                  <animateMotion
                    path="M300,100 L150,150 L100,300 L150,450 L300,500 L450,450 L500,300 L450,150 L300,100"
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
                    path="M300,100 L150,150 L100,300 L150,450 L300,500 L450,450 L500,300 L450,150 L300,100"
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
                    path="M300,100 L150,150 L100,300 L150,450 L300,500 L450,450 L500,300 L450,150 L300,100"
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
                
                {/* Center lines to each vertex */}
                {[
                  {x: 300, y: 100},
                  {x: 150, y: 150},
                  {x: 100, y: 300},
                  {x: 150, y: 450},
                  {x: 300, y: 500},
                  {x: 450, y: 450},
                  {x: 500, y: 300}
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
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Heptagon Nodes - 7 corners - CARDS IN FRONT (z-index: 30) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {circularFlow.map((stage, index) => {
                const radius = 280;
                const baseAngle = -90;
                const angleStep = 360 / 7;
                const angle = baseAngle - (index * angleStep);
                
                let adjustedAngle = angle;
                let adjustedRadius = radius;
                
                switch(index) {
                  case 0:
                    adjustedAngle = -90;
                    adjustedRadius = radius;
                    break;
                  case 1:
                    adjustedAngle = -90 - 51.43;
                    adjustedRadius = radius + 10;
                    break;
                  case 2:
                    adjustedAngle = -90 - (51.43 * 2);
                    adjustedRadius = radius + 15;
                    break;
                  case 3:
                    adjustedAngle = -90 - (51.43 * 3);
                    adjustedRadius = radius + 10;
                    break;
                  case 4:
                    adjustedAngle = -90 - (51.43 * 4);
                    adjustedRadius = radius;
                    break;
                  case 5:
                    adjustedAngle = -90 - (51.43 * 5);
                    adjustedRadius = radius + 10;
                    break;
                  case 6:
                    adjustedAngle = -90 - (51.43 * 6);
                    adjustedRadius = radius + 15;
                    break;
                }
                
                const finalAngleRad = (adjustedAngle * Math.PI) / 180;
                const centerX = Math.cos(finalAngleRad) * adjustedRadius;
                const centerY = Math.sin(finalAngleRad) * adjustedRadius;
                
                const cardWidth = 170;
                const cardHeight = 150;
                
                let fineTuneX = 0;
                let fineTuneY = 0;
                
                if (index === 0) {
                  fineTuneY = -5;
                } else if (index === 1) {
                  fineTuneX = -10;
                  fineTuneY = -3;
                } else if (index === 2) {
                  fineTuneX = -15;
                } else if (index === 3) {
                  fineTuneX = -10;
                  fineTuneY = 3;
                } else if (index === 4) {
                  fineTuneY = 5;
                } else if (index === 5) {
                  fineTuneX = 10;
                  fineTuneY = 3;
                } else if (index === 6) {
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
                      if (!isScrolling) {
                        setHoveredStage(null);
                      }
                    }}
                    onClick={() => handleFlowCardClick(index)}
                  >
                    <div className="relative group">
                      <div 
                        className={`w-[170px] bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg transition-all duration-300 ${
                          hoveredStage === index ? 'scale-110 shadow-xl ring-2 ring-blue-300/50' : 'hover:scale-105 hover:shadow-xl'
                        } ${
                          activeStage === index 
                            ? 'ring-2 ring-blue-400 scale-105' 
                            : ''
                        }`}
                      >
                        <div className={`w-9 h-9 ${stage.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300 shadow-md`}>
                          <div className="text-white">
                            {stage.icon}
                          </div>
                        </div>
                        
                        <h3 className="text-sm font-bold text-gray-900 mb-2 text-center">
                          {stage.stage}
                        </h3>
                        
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
                <div className={`w-3 h-3 rounded-full ${circularFlow[hoveredStage].color}`}></div>
                <span className="font-medium text-gray-900">{circularFlow[hoveredStage].stage}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{circularFlow[hoveredStage].description}</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Interactive Cards Section - Shows details of clicked stage */}
      <section ref={interactiveCardsRef} className="py-24 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm border border-blue-200/50 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Platform Modules</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black-600 mb-6">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Platform Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Click on any stage in the workflow above to explore its detailed capabilities
            </p>
            
            {/* Stage indicator pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {circularFlow.map((stage, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveStage(index);
                    handleFlowCardClick(index);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 ${
                    activeStage === index 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white border-transparent shadow-md' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                  <span className="text-sm font-medium">{stage.stage}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Interactive Card - Shows details of active stage */}
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className={`relative rounded-3xl bg-gradient-to-br ${activeCard.color} border ${activeCard.borderColor} overflow-hidden shadow-lg`}>
              {/* Subtle texture overlay */}
              {/* <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]" /> */}
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] -z-10" />
              {/* Header with icon */}
              <div className="relative p-8 border-b border-gray-200/30">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md border border-gray-200/50">
                      {activeCard.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {activeCard.title}
                      </h3>
                      <p className="text-lg text-gray-700">
                        {activeCard.subtitle}
                      </p>
                    </div>
                  </div>
                  <Link href={activeCard.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <span>Explore Module</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
                
                <p className="text-lg text-gray-800 leading-relaxed">
                  {activeCard.description}
                </p>
              </div>
              
              {/* Content section */}
              <div className="relative p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Features */}
                  <div className="lg:col-span-2">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeCard.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-800 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h4>
                    <div className="space-y-4">
                      {activeCard.metrics.map((metric, index) => (
                        <div key={index} className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50">
                          <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                          <div className="text-sm text-gray-700">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress indicator */}
              {/* <div className="relative h-1 bg-gray-200/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-gray-900 to-gray-800"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div> */}
            </div>
          </motion.div>

          {/* All cards preview */}
          
        </div>
      </section>

      {/* Core Modules Section */}
      

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
            <div className="relative rounded-3xl bg-gradient-to-br from-white/95 to-blue-50/95 border-2 border-blue-100/50 p-12 shadow-xl">
              {/* Subtle texture */}
              {/* <div className="absolute inset-0 rounded-3xl opacity-10 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" /> */}
              <div className="absolute inset-0 rounded-3xl opacity-10 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] -z-10" />

              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Start Building Today
                </h2>

                <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                  Join thousands of teams using our platform to transform customer experiences with AI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/contact">
                      <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
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
                      <button className="group inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-white transition-all duration-300">
                        <span>Schedule a Demo</span>
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </Link>
                  </motion.div>
                </div>
                
                <p className="text-sm text-gray-600 mt-8">
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