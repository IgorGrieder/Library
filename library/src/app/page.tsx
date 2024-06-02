'use client';

export default function Home() {
  let k = null;
  const handleButtonCLick = async () => {
    let jayk = await fetch('http://localhost:8080/books');
    k = await jayk.json();
    console.log(k);
  };

  return (
    <div>
      <button onClick={handleButtonCLick}>hi</button>
    </div>
  );
}
