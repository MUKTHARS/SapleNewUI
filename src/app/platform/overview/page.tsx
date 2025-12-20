export default function PlatformOverviewPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Platform Overview</h1>
        <p className="text-gray-300 text-lg mb-6">A no-code, enterprise-ready platform to build, deploy, and manage AI agents across chat, voice, and workflows — securely and at scale.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Neo Canvas</h3>
            <p className="text-gray-400">Visual AI agent builder with drag-and-drop interface</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Integrations</h3>
            <p className="text-gray-400">Seamless integration with your existing systems</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Responsible AI</h3>
            <p className="text-gray-400">Ethical and secure AI deployment</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Scalable Architecture</h3>
            <p className="text-gray-400">Enterprise-grade performance and reliability</p>
          </div>
        </div>
      </div>
    </div>
  );
}