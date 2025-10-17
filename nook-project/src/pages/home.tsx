import FeedHeader from "../components/feedheader";
import Stories from "../components/stories";

function Home() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-[90%] flex flex-col">
        {/* Sección superior: Header */}
        <div className="flex justify-start mt-0">
          <div className="w-1/2">
            <FeedHeader />
          </div>
        </div>

        {/* Sección inferior: Feed y Stories */}
        <div className="flex justify-between mt-5 gap-5">
          {/* Aquí irá el feed (lo dejamos vacío por ahora) */}
          <div className="w-2/3 bg-white rounded-3xl shadow-sm h-[600px] border border-gray-100"></div>

          {/* Historias verticales a la derecha */}
          <div className="w-[310px]">
            <Stories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;