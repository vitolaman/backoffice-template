import Spinner from './index';

const Loader: React.FC = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Spinner />
    </div>
  );
};

export { Loader };
