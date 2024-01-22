
import config from "@/config";

export function filterKeyword(data: any): boolean {
  if (data.keyword.length < 3)
    return false;

  if (config.keywordsBlacklist.includes(data.keyword.toLowerCase()))
    return false;

  if (data.type === "person") { // check for type person to have at least two full words
    const words = data.keyword.split(" ");

    if (words.length < 2)
      return false;
  }

  return true;
}