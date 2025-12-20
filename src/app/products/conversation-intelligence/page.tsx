export default function ConversationIntelligencePage() {
  return (
    <div className='min-h-screen pt-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-white mb-4'>Conversation Intelligence</h1>
        <p className='text-gray-300 text-lg mb-6'>Turn every conversation into insight.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
          <div className='bg-gray-800/50 p-6 rounded-lg border border-white/10'>
            <h3 className='text-xl font-semibold text-white mb-2'>Conversation Analytics</h3>
            <p className='text-gray-400'>Deep analytics on customer interactions</p>
          </div>
          <div className='bg-gray-800/50 p-6 rounded-lg border border-white/10'>
            <h3 className='text-xl font-semibold text-white mb-2'>Intent & Topic Discovery</h3>
            <p className='text-gray-400'>Identify patterns and topics automatically</p>
          </div>
          <div className='bg-gray-800/50 p-6 rounded-lg border border-white/10'>
            <h3 className='text-xl font-semibold text-white mb-2'>Sentiment & CX Insights</h3>
            <p className='text-gray-400'>Understand customer sentiment and experience</p>
          </div>
          <div className='bg-gray-800/50 p-6 rounded-lg border border-white/10'>
            <h3 className='text-xl font-semibold text-white mb-2'>Automation Opportunity Discovery</h3>
            <p className='text-gray-400'>Identify automation potential in conversations</p>
          </div>
          <div className='bg-gray-800/50 p-6 rounded-lg border border-white/10'>
            <h3 className='text-xl font-semibold text-white mb-2'>AI Analyst</h3>
            <p className='text-gray-400'>AI-powered business intelligence</p>
          </div>
        </div>
      </div>
    </div>
  );
}
