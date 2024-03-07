import { toast } from "react-toastify";

export const parseStringToJson = (text: string) => {
  const newString = text.replaceAll(/[\r\n]+/gm, " ");
  const withoutSlash = newString?.replace(/\\/g, "");
  const noApostrophe = withoutSlash.replaceAll("'", "");
  const reducedQuotes = noApostrophe.replaceAll('""', '"');
  const lastString = reducedQuotes.replaceAll("```json", "");
  return JSON.parse(lastString.trim());
};

export const deleteDuplicates = (data: Array<any> = []) => {
  return Array.from(new Map(data.map((obj) => [obj.song, obj])).values());
};

export const showToast = (text: string) => {
  toast.error(text, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    theme: "dark",
  });
};
