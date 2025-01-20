import Blurt, { BlurtProps } from '~/components/blurt';


interface BlurtsProps {
  blurts: BlurtProps[] | [];
}

const Blurts: React.FC<BlurtsProps> = ({ blurts }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4">
      <ul className="space-y-4">
        {blurts.map((blurt) => (
          <Blurt key={blurt.id} {...blurt} />
        ))}
      </ul>
    </div>
  );
};

export default Blurts;