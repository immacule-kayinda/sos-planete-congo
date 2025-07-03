import StudentAccessGuard from "@/components/access-control/StudentAccessGuard";

export default function Exercices() {
  return (
    <StudentAccessGuard
      requiredAccess="allContent"
      fallbackContent={
        <div className="max-w-md mx-auto mt-8">
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Exercices Verrouillés
            </h2>
            <p className="text-gray-600 mb-4">
              Les exercices sont disponibles uniquement avec un accès complet.
              Vous pouvez actuellement accéder au premier conte.
            </p>
            <a
              href="/help"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Débloquer l'accès
            </a>
          </div>
        </div>
      }
    >
      <div>
        <h1 className="text-2xl font-bold mb-6">Exercices</h1>
        <div className="grid gap-6">
          {/* Contenu des exercices pour utilisateurs avec accès complet */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-3">
              Exercices de Mathématiques
            </h2>
            <p className="text-gray-600 mb-4">
              Améliorez vos compétences en mathématiques avec nos exercices
              interactifs.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Commencer
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-3">
              Exercices de Sciences
            </h2>
            <p className="text-gray-600 mb-4">
              Explorez le monde des sciences à travers nos activités pratiques.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Commencer
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-3">Exercices de Langue</h2>
            <p className="text-gray-600 mb-4">
              Perfectionnez votre maîtrise du français et des langues
              nationales.
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Commencer
            </button>
          </div>
        </div>
      </div>
    </StudentAccessGuard>
  );
}
