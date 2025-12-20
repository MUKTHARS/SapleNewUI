export default function BFSIPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">BFSI Solutions</h1>
        <p className="text-gray-300 text-lg mb-6">Solutions for banking financial services & insurance industry</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Banking Automation</h3>
            <p className="text-gray-400">AI-powered solutions for banking operations, customer service, and fraud detection.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Financial Services</h3>
            <p className="text-gray-400">Intelligent solutions for wealth management, investment advisory, and financial planning.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Insurance Solutions</h3>
            <p className="text-gray-400">AI-driven claims processing, underwriting, and customer support for insurance companies.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Compliance & Risk Management</h3>
            <p className="text-gray-400">Automated compliance monitoring and risk assessment solutions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}