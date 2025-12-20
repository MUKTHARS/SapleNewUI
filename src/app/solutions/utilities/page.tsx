export default function UtilitiesPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Utilities Solutions</h1>
        <p className="text-gray-300 text-lg mb-6">Solutions for oil, gas and utility industry</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Energy Management</h3>
            <p className="text-gray-400">AI solutions for energy consumption optimization and smart grid management.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Oil & Gas Operations</h3>
            <p className="text-gray-400">Predictive maintenance and operational efficiency for oil and gas facilities.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Customer Service Automation</h3>
            <p className="text-gray-400">AI-powered customer support for billing, service requests, and emergencies.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Infrastructure Monitoring</h3>
            <p className="text-gray-400">Real-time monitoring and predictive analytics for utility infrastructure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}