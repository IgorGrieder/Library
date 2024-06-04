import Header from '@/components/header';
import UserContext from '@/context/userContext';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <UserContext>
        <Header></Header>
      </UserContext>
    </div>
  );
}
