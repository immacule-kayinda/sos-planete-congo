'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  description: string;
  chaptersCount: number;
  quizzesCount: number;
  createdAt: string;
}

export default function ModulesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modules, setModules] = useState<Module[]>([]);

  // Simuler le chargement des données
  const mockModules: Module[] = [
    {
      id: '1',
      title: 'Introduction à l\'environnement',
      description: 'Découverte des bases de l\'environnement',
      chaptersCount: 5,
      quizzesCount: 2,
      createdAt: '2024-03-20',
    },
    {
      id: '2',
      title: 'La biodiversité',
      description: 'Comprendre la diversité des espèces',
      chaptersCount: 3,
      quizzesCount: 1,
      createdAt: '2024-03-21',
    },
  ];

  const filteredModules = mockModules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestion des modules</h1>
        <Link
          href="/admin/modules/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Ajouter un module
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher un module..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chapitres
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de création
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredModules.map((module) => (
                  <tr key={module.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {module.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{module.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{module.chaptersCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{module.quizzesCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(module.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/modules/${module.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Modifier
                      </Link>
                      <Link
                        href={`/admin/modules/${module.id}/chapters`}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Chapitres
                      </Link>
                      <button
                        onClick={() => {
                          // Implémenter la logique de suppression
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 