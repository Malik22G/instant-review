"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { InstagramIcon, TikTokIcon, YoutubeIcon } from "./Icons";
import SubmitButton from "./SubmitButton";
import OpenAI from "openai";
import axios from "axios";

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
    if (prompt.trim().length === 0) {
      console.warn("Prompt is empty.");
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        text: prompt.trim(),
        id: new Date().toISOString(),
        author: "human",
      },
    ]);

    setPrompt("");

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            text: data.result,
            id: new Date().toISOString(),
            author: "ai",
          },
        ]);
      } else {
        console.warn("API response error:", data.error?.message);
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
    }
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
      <div className="answers">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </>
  );
}

function MessageItem({ message }) {
  const [text, setText] = useState(
    message.author === "human" ? message.text : ""
  );

  useEffect(() => {
    setTimeout(() => {
      setText(message.text.slice(0, text.length + 1));
    }, 10);
  }, [text, message.text]);

  return (
    <div className="answer">
      <div className={`author author-${message.author}`}>{message.author}:</div>
      <div className="message">{text}</div>
    </div>
  );
}
