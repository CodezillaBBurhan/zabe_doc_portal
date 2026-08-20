import { Title } from '../atoms/Typography';
import CounterCard from '../molecules/CounterCard';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-4xl px-4">
      <Title>Vite + React + Atomic Design</Title>
      <CounterCard />
    </div>
  );
}
