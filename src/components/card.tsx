import Image from "next/image";

type CardType = {
  artist: string;
  song: string;
  url: string;
  image: string;
};

export const Card = ({ artist, song, url, image = "" }: CardType) => {
  return (
    <div className="bg-c_gray-950 w-full rounded-xl cursor-pointer hover:-translate-y-2 shadow-sm transition-all duration-300">
      <div className="h-28 relative">
        <Image
          src={image}
          alt="cover-image"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <p className="font-quicksand font-regular text-slate-100 text-sm">
          Artist: {artist}
        </p>
        <p className="font-quicksand font-regular text-slate-100 text-sm">
          Song: {song}
        </p>

        <div className="flex justify-center mt-4">
          <a href={url}>
            <button className="bg-black px-6 py-2 h-fit rounded-full font-quicksand text-slate-100 text-sm border border-black hover:border-s_green-500 transition-all duration-300">
              Listen it!
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
