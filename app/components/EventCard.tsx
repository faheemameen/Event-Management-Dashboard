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
    // <div
    //   className="max-w-md rounded mx-auto bg-white border border-gray-200 overflow-hidden shadow-lg my-4 cursor-pointer transition-transform transform hover:scale-105"
    //   onClick={handleClick}
    // >
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-2xl mb-2 flex justify-center">
    //       {name}
    //     </div>
    //     <Image
    //       className="w-full"
    //       src={headerImage}
    //       alt="Descriptive alt text"
    //       width={400}
    //       height={200}
    //       priority
    //     />
    //     <div className="flex justify-between">
    //       <p className="text-gray-600 text-sm mt-2">
    //         Start: {new Date(startDateTime).toLocaleDateString()}
    //       </p>
    //       <p className="text-gray-600 text-sm mt-2">
    //         End: {new Date(endDateTime).toLocaleDateString()}
    //       </p>
    //     </div>
    //     <div>
    //       <p className="text-gray-600 text-sm mt-2 flex justify-center">
    //         Venue: {venue}
    //       </p>
    //     </div>
    //   </div>
    // </div>
    // <div
    //   onClick={handleClick}
    //   className="flex items-center mt-4 cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
    // >
    //   <div className="flex-2 p-4 gap-5 ">
    //     <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
    //     <p className="text-gray-600 mb-2"> Start: {startDateTime}</p>
    //     <p className="text-gray-600 mb-2"> End: {endDateTime}</p>
    //     <p className="text-gray-600 mb-2">Venue: {venue}</p>
    //   </div>
    //   <div className="w-1/1">
    //     <Image
    //       className="object-cover"
    //       src={headerImage}
    //       alt={name}
    //       width={400}
    //       height={200}
    //     />
    //   </div>
    // </div>

    <div
      className="max-w-md rounded-lg mx-auto bg-white border border-gray-200 shadow-lg overflow-hidden my-4 cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      {/* Event Title */}
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2 text-center text-gray-800">
          {name}
        </div>

        {/* Event Image */}
        <Image
          className="w-full h-48 object-cover rounded-md"
          src={headerImage}
          alt={`${name} Image`}
          width={400}
          height={200}
          priority
        />

        {/* Event Details */}
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
