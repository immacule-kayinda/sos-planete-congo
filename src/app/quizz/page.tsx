"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Finished from "./ui/Finished";
import BottomSheet from "./ui/BottomSheet";
import { CheckCircleIcon } from "lucide-react";

const questions = [
  {
    question: "Qui est le hero principal ?",
    answers: ["Tetsi", "Totsi", "Mosi", "Betsi"],
    correct: 0,
  },
  {
    question: "Quel est le pays le plus peuplé d'Afrique ?",
    answers: ["Nigeria", "Congo", "Kenya", "Afrique du Sud"],
    correct: 0,
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const router = useRouter();
  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === q.correct;
    setIsCorrect(correct);
    setTimeout(() => {
      setShowCongrats(true);
    }, 300);
  };

  const handleCloseSheet = () => {
    setShowCongrats(false);
    setSelected(null);
    setIsCorrect(null);
    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  };

  if (finished) {
    return <Finished onContinue={() => router.push("/learn")} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white max-w-6xl m-auto">
      {/* Header: Close + Progress */}
      <div className="flex flex-col w-full px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.push("/learn")}
            className="text-3xl text-gray-400"
          >
            &times;
          </button>
        </div>
        <Progress value={progress} className="w-full h-4" />
      </div>

      {/* Question */}
      <div className="flex flex-col items-center flex-1 justify-center border-b">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10 mt-10">
          {q.question}
        </h2>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md px-4">
          {q.answers.map((a, i) => {
            let border = "border-gray-400";
            let bg = "bg-white";
            let text = "text-black";
            if (selected !== null) {
              if (i === selected) {
                if (isCorrect) {
                  border = "border-green-500";
                  bg = "bg-green-50";
                  text = "text-green-700";
                } else {
                  border = "border-red-500";
                  bg = "bg-red-50";
                  text = "text-red-700";
                }
              } else {
                border = "border-gray-200";
                text = "text-gray-400";
              }
            }
            return (
              <button
                key={i}
                className={`border border-b-4 ${border} rounded-lg py-4 px-2 text-lg hover:bg-cyan-50 hover:border-cyan-500 hover:text-cyan-800 font-bold ${bg} ${text} focus:outline-none transition-all duration-200`}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer: Passer / Continuer */}
      <div className="fixed bottom-0 left-0 right-0 border-t">
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-4 my-6 h-28 items-center max-w-6xl mx-auto">
          <Button
            variant="outline"
            className="border-2 hidden md:block border-b-4 border-gray-300 text-gray-400 font-bold rounded-xl py-3 w-auto px-8 text-lg hover:bg-gray-50 hover:text-accent-foreground/50 transition h-fit"
            onClick={handleCloseSheet}
          >
            Passer
          </Button>
          <Button
            className={`bg-primary hover:bg-primary/90 text-white font-bold rounded-xl py-3 px-8 text-lg transition shadow h-fit`}
            onClick={handleCloseSheet}
          >
            Valider
          </Button>
        </div>
      </div>

      {/* BottomSheet Félicitations ou Mauvaise réponse */}
      <BottomSheet
        open={showCongrats}
        onClose={handleCloseSheet}
        showButton={false}
      >
        <div className="flex w-full items-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 hidden md:block mr-10" />
          <div className="text-center md:text-left w-full">
            <div
              className={`w-16 h-1 mx-auto mb-4 rounded-full md:hidden ${
                isCorrect ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <div
              className={`text-2xl font-black mb-2 ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "Félicitations !" : "Mauvaise réponse"}
            </div>
            {/* <div className="text-lg">
              {isCorrect ? "Bonne réponse 🎉" : "Essaie encore !"}
            </div> */}
          </div>
          <div className="w-full md:w-auto flex gap-4 mt-6">
            <Button
              className="font-bold rounded-xl py-3 px-8 text-lg h-auto hover:bg-green-600 transition w-full bg-green-600 text-white border-b-4 border-green-700"
              onClick={handleCloseSheet}
            >
              Continuer
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
