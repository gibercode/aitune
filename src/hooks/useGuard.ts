import { useEffect } from "react";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/router";

const useAuthRedirect = () => {
  const { user } = useUserStore((state: any) => state);
  const router = useRouter();

  useEffect(() => {
    if (!user?.access_token) router.push("/");
    if (user?.access_token) router.push("/home");
  }, [user]);
};

export default useAuthRedirect;
