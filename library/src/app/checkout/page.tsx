'use client';
import Header from '@/components/header';

const Page = () => {
  return (
    <div className="h-screen bg-white pt-[100px] text-black">
      <Header></Header>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-barlow text-3xl">Thanks for you attention!</h1>
          <img src="/review.png" alt="" className="block" />
        </div>
      </div>
    </div>
  );
};

export default Page;
