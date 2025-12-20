export default function RetailPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Retail Solutions</h1>
        <p className="text-gray-300 text-lg mb-6">Solution for retail and e-commerce industry</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">E-commerce Support</h3>
            <p className="text-gray-400">AI-powered shopping assistants, product recommendations, and customer service.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Inventory Management</h3>
            <p className="text-gray-400">Smart inventory tracking, demand forecasting, and supply chain optimization.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Customer Experience</h3>
            <p className="text-gray-400">Personalized shopping experiences and customer journey optimization.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">Sales & Marketing</h3>
            <p className="text-gray-400">AI-driven sales support and targeted marketing campaigns.</p>
          </div>
        </div>
      </div>
    </div>
  );
}