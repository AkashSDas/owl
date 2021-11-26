import loader from "../../styles/components/common/Loader.module.scss";

export const Loader = () => (
  <div className="w-full h-screen flex justify-center items-center">
    <div
      className={`${loader["loader"]} ease-linear rounded-full border-8 border-t-8 border-grey1 h-32 w-32`}
    ></div>
  </div>
);

export const SmallPrimaryLoader = () => {
  return (
    <div className="w-6 h-6 flex justify-center items-center">
      <div
        className={`${loader["loader"]} ease-linear rounded-full border-2 border-t-2 border-purple-light h-6 w-6`}
      ></div>
    </div>
  );
};
