import { Spinner } from '@material-tailwind/react';

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner color="indigo" />
    </div>
  );
}

export default Loading;
