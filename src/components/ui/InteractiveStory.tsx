"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  X,
  Check,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "./button";
import { useToast } from "@/hooks/use-toast";

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
  storyId,
  audioUrl,
  pages,
  title,
  className,
}: InteractiveStoryProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMarkingAsCompleted, setIsMarkingAsCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const currentPage = pages[currentPageIndex];

  const checkCompletionStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/stories/${storyId}/progress`);
      if (response.ok) {
        const data = await response.json();
        setIsCompleted(data.isCompleted);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du statut:", error);
    }
  }, [storyId]);

  useEffect(() => {
    // Activer le mode plein écran automatiquement
    setIsFullscreen(true);

    // Vérifier le statut de completion au chargement
    checkCompletionStatus();

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [checkCompletionStatus]);

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

  const markStoryAsCompleted = async () => {
    if (isMarkingAsCompleted) return;

    setIsMarkingAsCompleted(true);
    try {
      const response = await fetch(`/api/stories/${storyId}/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsCompleted(true);
        toast({
          title: "🎉 Félicitations !",
          description:
            "Vous avez terminé de lire cette histoire ! Continuez votre apprentissage.",
          variant: "default",
          duration: 5000,
        });
      } else {
        throw new Error("Erreur lors du marquage");
      }
    } catch (error) {
      console.error("Erreur lors du marquage du conte comme lu:", error);
      toast({
        title: "Erreur",
        description:
          "Impossible de marquer le conte comme lu. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsMarkingAsCompleted(false);
    }
  };

  const handleManualMarkAsCompleted = () => {
    markStoryAsCompleted();
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentPageIndex(0);
    setCurrentTime(0);
    stopProgressTracking();

    // Marquer le conte comme lu
    markStoryAsCompleted();
  };

  const handleExit = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    router.back();
  };

  const totalDuration =
    pages.reduce((acc, page) => acc + page.duration, 0) / 1000;

  // Composant en plein écran
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black">
        {/* Header avec titre et bouton fermer */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 md:p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleExit}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg md:text-xl font-bold text-white text-center flex-1 px-4">
              {title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleExit}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Image principale en plein écran */}
        <div className="relative w-full h-full">
          <Image
            width={1920}
            height={1080}
            src={currentPage.imageUrl}
            alt={currentPage.caption}
            className="w-full h-full object-cover"
            priority
          />

          {/* Caption overlay */}
          <div className="absolute bottom-24 md:bottom-36 left-0 right-0 px-4 md:px-8">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 md:p-6 mx-auto max-w-4xl">
              <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed text-center">
                {currentPage.caption}
              </p>
            </div>
          </div>

          {/* Contrôles audio en bas */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-4 md:p-6 pb-6">
            <div className="max-w-4xl mx-auto space-y-4">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={handleAudioEnded}
                onPlay={handlePlay}
                onPause={handlePause}
              />

              {/* Bouton marquer comme lu */}
              {!isCompleted && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleManualMarkAsCompleted}
                    disabled={isMarkingAsCompleted}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  >
                    {isMarkingAsCompleted ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Marquage...
                      </div>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Marquer comme lu
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Indicateur de completion */}
              {isCompleted && (
                <div className="flex justify-center animate-in slide-in-from-bottom-2 duration-500">
                  <div className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Check className="h-4 w-4" />
                    Conte terminé
                  </div>
                </div>
              )}

              {/* Boutons de contrôle */}
              <div className="flex items-center justify-center gap-3 md:gap-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20 w-10 h-10 md:w-12 md:h-12"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      setCurrentPageIndex(0);
                    }
                  }}
                >
                  <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="w-14 h-14 md:w-20 md:h-20 bg-white/10 hover:bg-white/20 text-white border-white/20"
                  onClick={isPlaying ? handlePause : handlePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 md:h-10 md:w-10" />
                  ) : (
                    <Play className="h-6 w-6 md:h-10 md:w-10" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20 w-10 h-10 md:w-12 md:h-12"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = totalDuration;
                      setCurrentPageIndex(pages.length - 1);
                    }
                  }}
                >
                  <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-xs md:text-sm text-white/80 min-w-[35px] md:min-w-[40px]">
                  {Math.floor(currentTime / 60)}:
                  {String(Math.floor(currentTime % 60)).padStart(2, "0")}
                </span>

                <input
                  type="range"
                  min={0}
                  max={totalDuration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1 md:h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 md:[&::-webkit-slider-thumb]:w-4 md:[&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 md:[&::-moz-range-thumb]:w-4 md:[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white 
                    [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  aria-label="Progression audio"
                />

                <span className="text-xs md:text-sm text-white/80 min-w-[35px] md:min-w-[40px]">
                  {Math.floor(totalDuration / 60)}:
                  {String(Math.floor(totalDuration % 60)).padStart(2, "0")}
                </span>
              </div>

              {/* Indicateur de page */}
              <div className="flex justify-center">
                <div className="flex gap-1 md:gap-2">
                  {pages.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300",
                        index === currentPageIndex ? "bg-white" : "bg-white/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback - ne devrait pas être utilisé mais garde l'interface originale
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
      {/* Reste des contrôles... */}
    </div>
  );
}
