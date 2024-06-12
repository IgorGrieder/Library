import Header from '@/components/header';

const Page = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header></Header>
      <div className="grid grid-cols-2 px-5">
        <div>
          <h4>Checkout</h4>
        </div>
        <div>
          {
            // items will be displayed here
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
