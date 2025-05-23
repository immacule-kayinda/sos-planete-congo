'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Classroom {
  id: string;
  name: string;
  teacherName: string;
  studentsCount: number;
  createdAt: string;
}

export default function ClassroomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  // Simuler le chargement des données
  const mockClassrooms: Classroom[] = [
    {
      id: '1',
      name: 'CM2A',
      teacherName: 'John Doe',
      studentsCount: 25,
      createdAt: '2024-03-20',
    },
    {
      id: '2',
      name: 'CM1B',
      teacherName: 'Jane Smith',
      studentsCount: 28,
      createdAt: '2024-03-21',
    },
  ];

  const filteredClassrooms = mockClassrooms.filter(
    (classroom) =>
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestion des classes</h1>
        <Link
          href="/admin/classrooms/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Ajouter une classe
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher une classe..."
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
                    Nom de la classe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enseignant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre d'étudiants
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
                {filteredClassrooms.map((classroom) => (
                  <tr key={classroom.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {classroom.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{classroom.teacherName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{classroom.studentsCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(classroom.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/classrooms/${classroom.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Modifier
                      </Link>
                      <Link
                        href={`/admin/classrooms/${classroom.id}/students`}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Étudiants
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