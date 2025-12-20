export default function HealthcarePage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Healthcare Solutions</h1>
        <p className="text-gray-300 text-lg mb-6">Solutions for healthcare and pharmaceuticals industry</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Patient Care Assistance</h3>
            <p className="text-gray-400">AI-powered patient support, appointment scheduling, and medical assistance.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Pharmaceutical Support</h3>
            <p className="text-gray-400">Drug information, research assistance, and pharmaceutical customer service.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Telemedicine Platforms</h3>
            <p className="text-gray-400">Virtual healthcare consultations and remote patient monitoring solutions.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Medical Data Analysis</h3>
            <p className="text-gray-400">AI-powered analysis of medical records and diagnostic support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}