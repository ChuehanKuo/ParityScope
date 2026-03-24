interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepProcessProps {
  steps: Step[];
}

export function StepProcess({ steps }: StepProcessProps) {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-6 top-0 hidden h-full w-px bg-light-gray md:block" />
      <div className="space-y-8 md:space-y-12">
        {steps.map((step) => (
          <div key={step.number} className="relative flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal text-lg font-bold text-white">
              {step.number}
            </div>
            <div className="flex-1">
              <h3 className="text-h4 font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-body text-medium-gray">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
