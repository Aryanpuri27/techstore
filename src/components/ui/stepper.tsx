import React from "react";

interface StepperProps {
  activeStep: number;
  children: React.ReactNode;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  activeStep,
  children,
  className,
}) => {
  const steps = React.Children.toArray(children);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex items-center ${
              index < activeStep ? "text-primary" : "text-gray-400"
            }`}
          >
            <div
              className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                index < activeStep
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300"
              } flex items-center justify-center`}
            >
              {index + 1}
            </div>
            {/* <div className=" top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase">
              {step}
            </div> */}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                index < activeStep ? "border-primary" : "border-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Step: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
