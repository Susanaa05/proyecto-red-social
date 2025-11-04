import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, MapPin, X } from "lucide-react";
import postsData from '../data/posts.json';


function SerachPage() {

    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const allPlaces = postsData.map((post) => post.title);
    const filteredPlaces = allPlaces.filter((place) =>
        place.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (place: string) => {
        navigate("/", { state: { selectedPlace: place } });
    };

    return (
        <div className=" bg-black text-white p-5 flex flex-col rounded-lg">
            <button onClick={() => navigate("/")} className="mt-4 text-sm text-gray-400 hover:text-purple-500 mb-5"><X /></button>
            <div className="flex flex-row">
                <SearchIcon className="mr-2 text-purple-300" />
                <input
                    type='text'
                    placeholder="Search places"
                    className="bg-transparent border-b border-purple-400 w-full focus:outline-none "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}

                />
            </div>
            <div className="flex-1 overflow-y-auto mt-5">
                {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(place)}
                            className="flex items-center p-2 hover:bg-purple-500 cursor-pointer rounded-lg"
                        >
                            <MapPin className="w-4 h-4 text-purple-300 mr-2" />
                            <span>{place}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-sm">No results found</p>
                )}
            </div>
        </div>

    )
}

export default SerachPage;