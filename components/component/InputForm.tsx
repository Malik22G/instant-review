"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { InstagramIcon, TikTokIcon, YoutubeIcon } from "./Icons";
import SubmitButton from "./SubmitButton";
import OpenAI from "openai";
import axios from "axios";
import { comment } from "postcss";

const Apps = ["Youtube", "Instagram", "Tiktok"] as const;
export type App = (typeof Apps)[number];

type Message = {
  text: string;
  id: string;
  author: "human" | "ai";
};

export default function InputForm() {
  const [selectedButton, setSelectedButton] = useState<App>("Youtube");
  const [link, setLink] = useState("");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const url = prompt;
    const response = await fetch("/api/youtube", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const comments = await response.json();
    setMessages(comments);
  };
  //   useEffect(() => {
  //     axios
  //       .post(
  //         "https://api.openai.com/v1/engines/davinci-codex/completions",
  //         {
  //           prompt:
  //             "Translate the following English text to French: 'Hello, how are you?'",
  //           max_tokens: 60,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error calling OpenAI API:", error);
  //       });
  //   }, []);

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <Input
          className="w-full"
          id="url"
          placeholder="Enter a link here"
          type="url"
          onChange={(event) => {
            setPrompt(event.target.value);
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
        <SubmitButton onClick={handleSubmit} />
      </div>
      <div className="answers"></div>
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Review
        </h2>
        {messages.map((message, index) => (
          <p key={index} className="text-gray-700 dark:text-gray-300">
            {index}:{message}
            <br />
          </p>
        ))}
      </div>
    </>
  );
}

// function MessageItem({ message }) {
//   const [text, setText] = useState(
//     message.author === "human" ? message.text : ""
//   );

//   useEffect(() => {
//     setTimeout(() => {
//       setText(message.text.slice(0, text.length + 1));
//     }, 10);
//   }, [text, message.text]);

//   return (
//     <div className="answer">
//       <div className={`author author-${message.author}`}>{message.author}:</div>
//       <div className="message">{text}</div>
//     </div>
//   );
// }
