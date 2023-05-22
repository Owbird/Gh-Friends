import { INetwork } from "@/interfaces/interfaces";

export default async function (user: string) {
  const res = await fetch(`https://gh-friends.vercel.app/api/user?q=${user}`, {
    cache: "no-cache",
  });

  const data = (await res.json()) as INetwork;

  return data;
}
