import { useState } from 'react';
import Button from '../atoms/Button';
import { Text } from '../atoms/Typography';

export default function CounterCard() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full">
      <Button className="mb-6" onClick={() => setCount((c) => c + 1)}>
        Count is {count}
      </Button>
      <Text className="text-center">
        Edit <code className="bg-gray-700 px-2 py-1 rounded text-pink-400">src/components/molecules/CounterCard.jsx</code> and save to test HMR
      </Text>
    </div>
  );
}
