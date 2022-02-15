import type { LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import stylesUrl from "~/styles/jokes.css";
import type { Joke } from "@prisma/client";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) throw new Error("Joke not found");

  const data: LoaderData = { joke };
  return data;
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
    </div>
  );
}
