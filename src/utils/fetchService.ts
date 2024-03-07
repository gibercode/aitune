import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const URL = process.env.NEXT_PUBLIC_API_URL;
const AI_URL = process.env.NEXT_PUBLIC_AI_URL;

const URL_TYPE: any = {
  auth: BASE_URL,
  api: URL,
  ai: AI_URL,
};

const contentType: any = {
  ai: "application/json",
};

export const fetchService = async (
  method: string = "get",
  data: any = null,
  url: string,
  params: any = null,
  token = "",
  variant = "auth"
) => {
  const options: any = {
    method,
    url: `${URL_TYPE[`${variant}`]}${url}`,
    data,
    headers: {
      "Content-Type":
        contentType[`${variant}`] || "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    params,
  };

  if (token) options.headers["Authorization"] = `Bearer ${token}`;

  try {
    const { data: response } = await axios(options);
    if (!response) return { error: "something went wrong!" };
    if (response) return { response };
  } catch (error) {
    return { error };
  }
};
