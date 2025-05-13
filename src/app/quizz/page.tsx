"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Finished from "./ui/Finished";
import BottomSheet from "./ui/BottomSheet";

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
                className={`border ${border} rounded-lg py-4 px-2 text-lg font-medium ${bg} ${text} focus:outline-none transition-all duration-200`}
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
      <div className="w-full flex flex-col md:flex-row md:justify-end gap-4 my-6">
        <Button
          variant="outline"
          className="border-2 border-red-600 text-red-600 font-bold rounded-xl py-3 px-8 text-lg hover:bg-red-50 transition"
          onClick={handleCloseSheet}
        >
          Passer
        </Button>
        <Button
          className={`bg-primary hover:bg-primary/90 text-white font-bold rounded-xl py-3 px-8 text-lg transition shadow`}
          onClick={handleCloseSheet}
        >
          Continuer
        </Button>
      </div>

      {/* BottomSheet Félicitations ou Mauvaise réponse */}
      <BottomSheet
        open={showCongrats}
        onClose={handleCloseSheet}
        showButton={false}
      >
        <div className="text-center w-full">
          <div
            className={`w-16 h-1 mx-auto mb-4 rounded-full ${
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
          <div className="text-lg">
            {isCorrect ? "Bonne réponse 🎉" : "Essaie encore !"}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:justify-end gap-4 mt-6">
          <button
            className="border-2 border-red-600 text-red-600 font-bold rounded-xl py-3 px-8 text-lg hover:bg-red-50 transition"
            onClick={handleCloseSheet}
          >
            Passer
          </button>
          <button
            className={`bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl py-3 px-8 text-lg transition shadow`}
            onClick={handleCloseSheet}
          >
            Continuer
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
