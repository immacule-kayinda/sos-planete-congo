import { useState, useEffect } from "react";

interface StudentProfile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  age: number;
  email: string;
  createdAt: string;
  lastLogin: string | null;
  isActive: boolean;
  accountStatus: string;
  classroom: {
    name: string;
    classCode: string;
  } | null;
  teacher: {
    firstName: string;
    lastName: string;
    school: string;
  } | null;
  stats: {
    totalStars: number;
    completedChapters: number;
    totalChapters: number;
    avgAccuracy: number;
    currentStreak: number;
    lastActive: string | null;
    progressPercentage: number;
    totalTimeSpent: string;
    division: string;
    completedContes: number;
    balance: number;
  };
  inventory: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string | null;
    quantity: number;
    purchasedAt: string;
  }>;
}

export function useStudentProfile() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/student/profile");

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du profil");
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refreshProfile = () => {
    fetchProfile();
  };

  return {
    profile,
    loading,
    error,
    refreshProfile,
  };
}
