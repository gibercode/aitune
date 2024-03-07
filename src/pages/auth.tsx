import { useEffect, useState } from "react";
import { Loader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { fetchService } from "@/utils";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

const AuthPage = () => {
  const { setData } = useUserStore();
  const [urlParams, setUrlParams] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window?.location?.search);
    setUrlParams(urlParams);
  }, []);

  useEffect(() => {
    if (!urlParams) return;
    const code = urlParams.get("code");
    if (code) {
      urlParams.delete("code");
      getToken(code);
    }
  }, [urlParams]);

  const getToken = async (code: string) => {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI || "",
      client_id: CLIENT_ID || "",
      client_secret: CLIENT_SECRET || "",
    });

    try {
      const { response, error }: any = await fetchService(
        "POST",
        body,
        "token"
      );
      if (error) throw new Error(error);
      setData(response);
      router.replace("/home");
    } catch (error: any) {
      router.push("/");
      throw new Error(error);
    }
  };
  return (
    <div className="h-dvh bg-black w-full flex items-center justify-center">
      <Loader />;
    </div>
  );
};

export default AuthPage;
