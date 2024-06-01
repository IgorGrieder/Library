'use client';

export default function Home() {
  const handleButtonCLick = async () => {
    await fetch('http://localhost:8080/dsadasd');
  };
  return (
    <div>
      <button onClick={handleButtonCLick}>hi</button>
    </div>
  );
}
