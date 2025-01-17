import { ring2 } from "ldrs";

ring2.register();

// Default values shown
export const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <l-ring-2 size="40" stroke="5" stroke-length="0.25" bg-opacity="0.1" speed="0.8" color="black"></l-ring-2>
    </div>
  );
};
