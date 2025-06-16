"use client";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  showRetryButton?: boolean;
}

export default function ErrorDisplay({
  title = "Erreur de chargement",
  message = "Une erreur s'est produite. Veuillez réessayer.",
  showRetryButton = true,
}: ErrorDisplayProps) {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl p-8">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-center mb-4">{message}</p>
      {showRetryButton && (
        <button
          onClick={handleRetry}
          className="bg-[#5B4FFF] text-white px-6 py-2 rounded-lg hover:bg-[#4a3fee] transition-colors"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
