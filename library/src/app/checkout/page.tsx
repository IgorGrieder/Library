'use client';
import Header from '@/components/header';

const Page = () => {
  return (
    <div className="h-screen bg-white pt-[100px] text-black">
      <Header></Header>
      <div className="flex h-full items-center justify-center">
        <h1 className="font-barlow text-3xl">Thanks for you attention!</h1>
      </div>
    </div>
  );
};

export default Page;
