"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useScroll } from "@/hooks/use-scroll";

export default function HelpPage() {
  const scrollY = useScroll();
  const isScrolled = scrollY > 50;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du formulaire de contact
    console.log("Message envoyé:", formData);
    // Réinitialiser le formulaire
    setFormData({ name: "", email: "", message: "" });
    alert("Votre message a été envoyé avec succès !");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        className={isScrolled ? "backdrop-blur-3xl bg-white/20" : undefined}
      />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-sky-50 to-white py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-6">
                  Centre d'Aide
                </h1>
                <p className="text-xl text-neutral-600">
                  Trouvez des réponses à vos questions sur SOS Planète Congo
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-center mb-12 text-sky-700">
                Questions Fréquemment Posées
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="inscription"
                    className="border border-sky-100 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sky-700">
                      Comment s'inscrire sur la plateforme ?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600">
                      <p>Pour vous inscrire sur SOS Planète Congo :</p>
                      <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>
                          Cliquez sur le bouton "S'inscrire" dans la navigation
                        </li>
                        <li>
                          Choisissez votre profil : Apprenant ou Enseignant
                        </li>
                        <li>Remplissez le formulaire avec vos informations</li>
                        <li>
                          Pour les apprenants : vous aurez besoin d'un code
                          classe fourni par votre enseignant
                        </li>
                        <li>Confirmez votre inscription via l'email reçu</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="public"
                    className="border border-sky-100 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sky-700">
                      Pour qui est destinée cette plateforme ?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600">
                      <p>SOS Planète Congo s'adresse à :</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>
                          <strong>Élèves :</strong> Pour découvrir les contes,
                          participer aux quiz, faire des exercices et apprendre
                          les langues nationales
                        </li>
                        <li>
                          <strong>Enseignants :</strong> Pour accéder au
                          matériel pédagogique, télécharger des ressources et
                          suivre leurs élèves
                        </li>
                        <li>
                          <strong>Établissements scolaires :</strong> Pour
                          intégrer l'éducation environnementale dans leur
                          curriculum
                        </li>
                        <li>
                          <strong>Familles :</strong> Pour sensibiliser les
                          enfants à la protection de l'environnement
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="code-classe"
                    className="border border-sky-100 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sky-700">
                      Comment obtenir un code classe ?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600">
                      <p>
                        Le code classe est fourni par votre enseignant inscrit
                        sur la plateforme :
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>
                          Votre enseignant doit d'abord créer un compte
                          enseignant
                        </li>
                        <li>
                          Il peut ensuite créer une classe et obtenir un code
                          unique
                        </li>
                        <li>
                          Ce code vous permet de rejoindre sa classe et
                          d'accéder aux contenus
                        </li>
                        <li>
                          Si vous n'avez pas de code, contactez directement
                          votre enseignant ou l'équipe SOS Planète Congo
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="soutenir"
                    className="border border-sky-100 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sky-700">
                      Comment soutenir le projet SOS Planète Congo ?
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600">
                      <p>
                        Vous pouvez soutenir notre mission de plusieurs façons :
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>
                          <strong>Acheter nos livres :</strong> Disponibles sur
                          Amazon, Weyrich et autres plateformes
                        </li>
                        <li>
                          <strong>Partenariat :</strong> Contactez-nous pour des
                          collaborations institutionnelles
                        </li>
                        <li>
                          <strong>Partage :</strong> Faites connaître la
                          plateforme autour de vous
                        </li>
                        <li>
                          <strong>Feedback :</strong> Aidez-nous à améliorer
                          l'expérience utilisateur
                        </li>
                        <li>
                          <strong>Sponsoring :</strong> Contactez-nous pour
                          devenir partenaire officiel
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gradient-to-b from-white to-sky-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-sky-700 mb-4">
                  Contactez-nous
                </h2>
                <p className="text-xl text-neutral-600">
                  Vous n'avez pas trouvé la réponse à votre question ?
                  Écrivez-nous !
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-sky-700">
                    Formulaire de Contact
                  </CardTitle>
                  <CardDescription>
                    Nous vous répondrons dans les plus brefs délais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-neutral-700"
                      >
                        Nom complet *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Votre nom complet"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-neutral-700"
                      >
                        Adresse email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre.email@exemple.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-neutral-700"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Décrivez votre question ou votre message..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                    >
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
