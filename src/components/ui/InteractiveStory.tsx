"use client";

import { cn } from "@/lib/utils";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";

interface Page {
  id: string;
  imageUrl: string;
  caption: string;
  duration: number;
  order: number;
}

interface InteractiveStoryProps {
  storyId: string;
  audioUrl: string;
  pages: Page[];
  title: string;
  className?: string;
}

export default function InteractiveStory({
  //   storyId,
  audioUrl,
  pages,
  title,
  className,
}: InteractiveStoryProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const currentPage = pages[currentPageIndex];

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startProgressTracking();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      stopProgressTracking();
    }
  };

  const startProgressTracking = () => {
    progressInterval.current = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        setCurrentTime(currentTime);

        // Find the current page based on time
        let totalDuration = 0;
        for (let i = 0; i < pages.length; i++) {
          totalDuration += pages[i].duration / 1000; // Convert to seconds
          if (currentTime < totalDuration) {
            if (currentPageIndex !== i) {
              setCurrentPageIndex(i);
            }
            break;
          }
        }
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentPageIndex(0);
    setCurrentTime(0);
    stopProgressTracking();
  };

  const totalDuration =
    pages.reduce((acc, page) => acc + page.duration, 0) / 1000;

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-4", className)}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <figure className="relative aspect-video mb-4 rounded-lg overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={currentPage.imageUrl}
          alt={currentPage.caption}
          className="w-full h-full object-cover"
        />
        <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
          {currentPage.caption}
        </figcaption>
      </figure>

      <div className="space-y-4">
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleAudioEnded}
          onPlay={handlePlay}
          onPause={handlePause}
        />

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setCurrentPageIndex(0);
              }
            }}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={isPlaying ? handlePause : handlePlay}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = totalDuration;
                setCurrentPageIndex(pages.length - 1);
              }
            }}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={totalDuration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1"
            aria-label="Audio progress"
          />
          <span className="text-sm text-muted-foreground">
            {Math.floor(currentTime / 60)}:
            {String(Math.floor(currentTime % 60)).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
