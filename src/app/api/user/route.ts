import { INetwork, IUser } from "@/interfaces/interfaces";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const user = searchParams.get("q");

  const res = await fetch(`https://api.github.com/users/${user}`, {
    cache: "no-cache",
  });

  const data = (await res.json()) as IUser;

  const followers = await fetch(data.followers_url, {
    cache: "no-cache",
  });

  const following = await fetch(
    data.following_url.replaceAll("{/other_user}", ""),
    {
      cache: "no-cache",
    }
  );

  const followers_data = (await followers.json()) as IUser[];
  const following_data = (await following.json()) as IUser[];

  const network: INetwork = {
    user: data,
    following: following_data,
    followers: followers_data,
  };

  return new Response(JSON.stringify(network));
}
