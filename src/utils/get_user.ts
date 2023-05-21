import { INetwork } from "@/interfaces/interfaces";

export default async function (user: string) {
  const res = await fetch(`http://localhost:3000/api/user?q=${user}`, {
    cache: "no-cache",
  });

  const data = (await res.json()) as INetwork;

  return data;
}
