"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { InstagramIcon, TikTokIcon, YoutubeIcon } from "./Icons";
import SubmitButton from "./SubmitButton";

const Apps = ["Youtube", "Instagram", "Tiktok"] as const;
export type App = (typeof Apps)[number];

export default function InputForm() {
  const [selectedButton, setSelectedButton] = useState<App>("Youtube");
  const [link, setLink] = useState("");

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <Input
          className="w-full"
          id="url"
          placeholder="Enter a link here"
          type="url"
          onChange={(event) => {
            setLink(event.target.value);
          }}
        />
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:shadow-lg hover:scale-105  focus:ring-2 focus:ring-violet-400 focus:outline-none active:bg-pink-600 transition duration-150 ease-in-out "
          autoFocus
          onClick={() => setSelectedButton("Youtube")}
        >
          <YoutubeIcon className="h-5 w-5" />
          <span>YouTube</span>
        </Button>
        <Button
          className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:shadow-lg  hover:scale-105 focus:ring-2 focus:ring-violet-400 focus:outline-none active:bg-pink-600 transition duration-150 ease-in-out"
          onClick={() => setSelectedButton("Instagram")}
        >
          <InstagramIcon className="h-5 w-5" />
          <span>Instagram</span>
        </Button>
        <Button
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:shadow-lg hover:scale-105   focus:ring-2 focus:ring-violet-400 focus:outline-none active:bg-pink-600 transition duration-150 ease-in-out"
          onClick={() => setSelectedButton("Tiktok")}
        >
          <TikTokIcon className="h-5 w-5" />
          <span>TikTok</span>
        </Button>
      </div>
      <div className="flex justify-center mt-4">
        <SubmitButton
          onClick={() => {
            console.log("clicked");
          }}
        />
      </div>
    </>
  );
}
