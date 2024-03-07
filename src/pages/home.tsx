"use client";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { fetchService } from "@/utils";
import { useUserStore } from "@/store/user";
import { Card } from "@/components/card";
import { Loader } from "@/components/loader";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { deleteDuplicates, parseStringToJson } from "@/utils/common";
import { useSongStore } from "@/store/song";
import useAuthRedirect from "@/hooks/useGuard";
import { showToast } from "@/utils/common";

const Home = () => {
  useAuthRedirect();
  const { setData } = useUserStore();
  const { songs, setSongs }: any = useSongStore();
  const router = useRouter();
  const { user } = useUserStore();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const buttonRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const handleFocus = () => inputRef?.current?.focus();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Enter") {
        if (!loading && search.length) sendSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [loading, search]);

  const handleLogout = async () => {
    await setData({});
    await localStorage.clear();
    await router.push("/");
  };

  const handleSearch = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };
  const sendSearch = async () => {
    try {
      setLoading(true);
      const { response }: any = await fetchService(
        "POST",
        { prompt: search },
        "",
        null,
        undefined,
        "ai"
      );

      const songs = parseStringToJson(response?.data);
      const promises = songs.map(async ({ artist, song }: any) => {
        const { response, error }: any = await fetchService(
          "GET",
          null,
          "search",
          {
            type: "track",
            q: `${artist} ${song}`,
          },
          user?.access_token,
          "api"
        );

        if (error?.response?.status === 401) {
          showToast("Unauthorized");
          handleLogout();
          return;
        }

        return {
          artist: response?.tracks?.items?.[0]?.artists?.[0]?.name,
          song: response?.tracks?.items?.[0]?.name,
          url: response?.tracks?.items?.[0]?.uri,
          image: response?.tracks?.items?.[0]?.album?.images?.[0]?.url,
          webUrl: response?.tracks?.items?.[0]?.external_urls?.spotify,
        };
      });
      const responses = await Promise.all(promises);
      const songArray = responses.map((response) => response);
      const localSongs = deleteDuplicates(songArray);
      setSongs(localSongs);
    } catch (error: any) {
      showToast("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black w-full min-h-dvh py-6 px-10 max-md:px-4 max-md:py-6">
        <nav className="flex justify-between items-center">
          <h2 className="text-3xl uppercase font-barlow font-bold text-slate-100">
            AITUNE
          </h2>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={handleLogout}
          >
            <h2 className="text-lg font-barlow font-regular text-slate-100">
              logout
            </h2>
            <Image
              alt="send-icon"
              src="/power-off.png"
              width={20}
              height={20}
            />
          </div>
        </nav>
        <div className="max-w-screen-2xl">
          <div className="flex justify-center mt-12">
            <div
              className="bg-c_gray-950 w-11/12 h-200px py-3 px-4 rounded-full flex justify-between max-md:p-2 max-md:w-full"
              onClick={handleFocus}
            >
              <input
                ref={inputRef}
                className="bg-c_gray-950 ml-2 font-quicksand w-full text-slate-100 focus:outline-none mr-2"
                placeholder="Search..."
                onChange={handleSearch}
                value={search}
              ></input>
              <button
                ref={buttonRef}
                disabled={loading || !search.length}
                className="bg-s_green-500 hover:bg-s_green-600 h-fit px-8 py-4 rounded-full font-semibold font-quicksand max-md:w-20 max-md:px-3 max-md:py-3 w-40 flex justify-center items-center disabled:cursor-not-allowed disabled:bg-s_green-700"
                onClick={sendSearch}
              >
                <p className="max-md:hidden">Send</p>
                <Image
                  alt="send-icon"
                  src="/send.png"
                  width={20}
                  height={20}
                  className="ml-2 max-md:ml-0"
                />
              </button>
            </div>
          </div>

          {!songs.length && (
            <div className="flex justify-center mt-12">
              {!loading && (
                <h2 className="text-slate-100 font-quicksand text-center text-md max-md:w-11/12">
                  No songs here to listen, search something and enjoy the music!
                </h2>
              )}
              {loading && <Loader />}
            </div>
          )}

          <div className="flex justify-center mt-16">
            {songs.length && !loading ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-4 gap-7 w-11/12 max-md:grid-cols-1 max-md:w-full"
              >
                {songs.map((card: any, index: number) => {
                  return (
                    <motion.li
                      variants={item}
                      className="list-none"
                      key={index}
                    >
                      <Card {...card} />
                    </motion.li>
                  );
                })}
              </motion.div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
