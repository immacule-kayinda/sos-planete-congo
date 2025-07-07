import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  BookOpen,
  Gamepad2,
  Trophy,
  ShoppingCart,
  User,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { StudentLayout } from "@/components/student/student-layout";

export default async function HelpPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "STUDENT") {
    redirect("/dashboard");
  }

  return (
    <StudentLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Centre d'Aide</h1>
        <p className="text-muted-foreground">
          Trouvez rapidement l'aide dont vous avez besoin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guide rapide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Guide Rapide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Apprendre</p>
                  <p className="text-xs text-muted-foreground">
                    Accédez aux modules et chapitres d'apprentissage
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Gamepad2 className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Jeux</p>
                  <p className="text-xs text-muted-foreground">
                    Jouez et apprenez avec nos jeux éducatifs
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="font-medium text-sm">Classement</p>
                  <p className="text-xs text-muted-foreground">
                    Comparez vos performances avec les autres
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="font-medium text-sm">Boutique</p>
                  <p className="text-xs text-muted-foreground">
                    Échangez vos étoiles contre des récompenses
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Questions Fréquentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-b pb-3">
                <p className="font-medium text-sm mb-1">
                  Comment gagner des étoiles ?
                </p>
                <p className="text-xs text-muted-foreground">
                  Complétez les chapitres, réussissez les quiz et maintenez
                  votre série quotidienne.
                </p>
              </div>
              <div className="border-b pb-3">
                <p className="font-medium text-sm mb-1">
                  Comment fonctionne la série quotidienne ?
                </p>
                <p className="text-xs text-muted-foreground">
                  Connectez-vous chaque jour pour maintenir votre série et
                  gagner des bonus.
                </p>
              </div>
              <div className="border-b pb-3">
                <p className="font-medium text-sm mb-1">
                  Comment débloquer plus de contenu ?
                </p>
                <p className="text-xs text-muted-foreground">
                  Demandez à votre professeur d'activer votre compte ou entrez
                  un code de classe.
                </p>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">
                  Comment modifier mon profil ?
                </p>
                <p className="text-xs text-muted-foreground">
                  Allez dans "Mon Profil" pour modifier vos informations
                  personnelles.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Nous Contacter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-sm">Email</p>
                <p className="text-xs text-muted-foreground">
                  support@sosplanete-congo.org
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Phone className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-sm">Téléphone</p>
                <p className="text-xs text-muted-foreground">
                  +242 06 XXX XX XX
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <User className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-sm">Votre Professeur</p>
                <p className="text-xs text-muted-foreground">
                  Contactez directement votre professeur
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statut du compte */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Statut de votre compte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500">Actif</Badge>
              <p className="text-sm text-muted-foreground">
                Votre compte est actif et vous avez accès à toutes les
                fonctionnalités.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
