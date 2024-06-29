type Props = {
  text: string;
};

const ConfirmationBox = ({ text }: Props) => {
  return (
    <div className="m-3 w-full rounded-lg border border-black bg-green-300 p-2">
      <img src="/check.png" alt="" className="w-6" />

      <h1 className="text-left" style={{ maxWidth: '30ch' }}>
        {text}
      </h1>
    </div>
  );
};

export default ConfirmationBox;
