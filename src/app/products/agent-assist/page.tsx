export default function AIAgentsPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">AI Agents</h1>
        <p className="text-gray-300 text-lg mb-6">Autonomous AI agents that think, act, and resolve.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Build AI Agents</h3>
            <p className="text-gray-400">Create custom AI agents without coding</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Train Agents</h3>
            <p className="text-gray-400">Continuously improve agent performance</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Conversational Agents</h3>
            <p className="text-gray-400">Chat & Voice agents for natural interactions</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Task & Workflow Agents</h3>
            <p className="text-gray-400">Automate complex business processes</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Appointment & Action Agents</h3>
            <p className="text-gray-400">Schedule and execute actions autonomously</p>
          </div>
        </div>
      </div>
    </div>
  );
}