export default function OtherIndustriesPage() {
  const industries = [
    {
      name: 'Manufacturing',
      description: 'AI solutions for production optimization, quality control, and predictive maintenance in manufacturing.'
    },
    {
      name: 'Logistics & Transportation',
      description: 'Route optimization, fleet management, and supply chain automation solutions.'
    },
    {
      name: 'Telecommunications',
      description: 'Network optimization, customer service automation, and predictive maintenance for telecom.'
    },
    {
      name: 'Education',
      description: 'Personalized learning, administrative automation, and educational support solutions.'
    },
    {
      name: 'Government',
      description: 'Public service automation, citizen engagement, and administrative efficiency solutions.'
    },
    {
      name: 'Hospitality',
      description: 'Guest services automation, booking management, and personalized hospitality experiences.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Other Industries</h1>
        <p className="text-gray-300 text-lg mb-8">Dynamic AI solutions for every industry</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-white/10 hover:border-blue-400/30 transition-all">
              <h3 className="text-xl font-semibold text-white mb-3">{industry.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{industry.description}</p>
              <div className="text-blue-400 text-sm font-medium">
                Available Solutions
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}