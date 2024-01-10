import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  const url = data.url;
  console.log(url);
  const videoId = url && url.match(/[?&]v=([^&#]*)/);

  if (!videoId) {
    console.error("No video ID found");
    return { error: "No video ID found" };
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId[1]}&maxResults=10&order=relevance&key=AIzaSyBXe4mJb04InYrluzHMjns0I3fTeyKsFqo`
    );

    const comments = response.data.items.map(
      (item: any) => item.snippet.topLevelComment.snippet.textDisplay
    );

    console.log("Comments:", comments);
    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}
// if (req.method === "GET") {
//   console.log("its get request");
// }

export const config = {
  api: {
    bodyParser: false,
  },
};
