"use client";
import { Github } from "../svg/github";
import Link from "next/link";
import { motion } from "framer-motion";
import useAuthRedirect from "@/hooks/useGuard";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const SCOPES = process.env.NEXT_PUBLIC_SCOPES;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export default function Home() {
  // useAuthRedirect();
  const handleOauth = () => {
    window.open(
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}`,
      "_self"
    );
  };

  return (
    <div className="flex justify-center items-center w-full h-dvh bg-gradient-to-bl from-black to-gray-800 overflow-hidden">
      <div className="flex flex-col h-dvh justify-between p-3">
        <div />
        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl mb-5 uppercase font-barlow font-extrabold text-slate-100 max-md:text-4xl"
          >
            Welcome to aitune
          </motion.h1>

          <motion.button
            onClick={handleOauth}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-s_green-500 hover:bg-s_green-600 h-fit px-8 py-4 rounded-full font-semibold font-quicksand max-md:px-6"
            whileTap={{ scale: 0.9 }}
          >
            Sign in with spotify
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <p className="text-slate-100 font-quicksand text-center mr-2">
            Developed by:{" "}
          </p>
          <Link
            href="https://github.com/gibercode"
            className="cursor-pointer"
            target="_blank"
          >
            <Github />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
