// components/bot-creation/shared/ProgressSteps.tsx
interface ProgressStepsProps {
  currentStep: number;
  steps: { number: number; title: string }[];
}

export function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep >= step.number
                ? 'bg-teal-600 border-teal-600 text-white'
                : 'border-gray-300 text-gray-500'
              }`}>
              {step.number}
            </div>
            <span className={`ml-2 text-sm font-medium ${currentStep >= step.number ? 'text-teal-600' : 'text-gray-500'
              }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? 'bg-teal-600' : 'bg-gray-300'
                }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}