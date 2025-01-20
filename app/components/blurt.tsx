export interface BlurtProps {
  id: any;
  user: string;
  content: string;
}

const Blurt: React.FC<BlurtProps> = ({ id, user, content }) => {
  return (
    <li key={id} className="bg-gray-700 p-4 rounded-lg text-white">
      <h2 className="font-bold">{user}</h2>
      <p>{content}</p>
    </li>
  );
};

export default Blurt;