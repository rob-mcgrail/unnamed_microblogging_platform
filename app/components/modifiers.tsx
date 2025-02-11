import { useUser } from "~/contexts/user-context";

const Modifiers = () => {
  const { modifiers } = useUser();

  return (
    <div className="flex flex-col gap-3 pl-6 pr-6">
      {modifiers.map((modifier) => (
        <div 
          key={modifier.identifier} 
          className="bg-gray-700 px-6 py-3 rounded-lg text-white w-full max-w flex justify-between text-base"
        >
          <span className="font-medium">{modifier.emoji} {modifier.name}:</span>
          <span className="whitespace-nowrap truncate ml-4">{modifier.description}</span>
        </div>
      ))}
    </div>
  );
};

export default Modifiers;
