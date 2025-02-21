import { DotLoader } from "react-spinners";

function Loader() {
  return (
    <div className="absolute left-0 top-0 z-[1001] h-screen w-full bg-black/10 backdrop-blur-[2px]">
      <div className="flex h-full w-full items-center justify-center">
        <DotLoader color="#220350" />
      </div>
    </div>
  );
}
export default Loader;
