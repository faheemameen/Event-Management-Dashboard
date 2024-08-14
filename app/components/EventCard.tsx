import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EventCard({
  _uuid,
  name,
  venue,
  startDateTime,
  endDateTime,
  headerImage,
}: any) {
  const router = useRouter();
  // console.log(_uuid);

  const handleClick = () => {
    router.push(`/events/${_uuid}`);
    console.log("Event Card", _uuid);
  };
  return (
   

    <div
      className="max-w-md rounded-lg mx-auto bg-white border border-gray-200 shadow-lg overflow-hidden my-4 cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2 text-center text-gray-800">
          {name}
        </div>

        <Image
          className="w-full h-48 object-cover rounded-md"
          src={headerImage}
          alt={`${name} Image`}
          width={400}
          height={200}
          priority
        />

        <div className="px-4 py-2">
          <div className="flex justify-between text-gray-600 text-sm mb-2">
            <p>
              <span className="font-semibold">Start:</span>{" "}
              {new Date(startDateTime).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">End:</span>{" "}
              {new Date(endDateTime).toLocaleDateString()}
            </p>
          </div>

          <div className="text-center text-gray-600 text-sm mb-2">
            <p>
              <span className="font-semibold">Venue:</span> {venue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
