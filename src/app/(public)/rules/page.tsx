"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import { LegalPage } from "@/components/ui/legal-page";

export default function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LegalPage
        title="Règles de conduite de la communauté"
        lastUpdated="1er Mars 2024"
      >
        <h2>1. Introduction</h2>
        <p>
          SOS Planète Congo est une communauté dédiée à l'éducation
          environnementale. Ces règles visent à créer un environnement
          respectueux, sûr et constructif pour tous les membres.
        </p>

        <h2>2. Principes fondamentaux</h2>
        <p>Notre communauté est fondée sur :</p>
        <ul>
          <li>Le respect mutuel</li>
          <li>L'apprentissage collaboratif</li>
          <li>La protection de l'environnement</li>
          <li>L'inclusion et la diversité</li>
        </ul>

        <h2>3. Comportement attendu</h2>
        <p>En tant que membre, vous devez :</p>
        <ul>
          <li>Respecter tous les membres de la communauté</li>
          <li>Partager des informations constructives et pertinentes</li>
          <li>Contribuer positivement aux discussions</li>
          <li>Respecter les opinions différentes</li>
          <li>Utiliser un langage approprié</li>
        </ul>

        <h2>4. Contenu interdit</h2>
        <p>Ne sont pas autorisés :</p>
        <ul>
          <li>Le contenu offensant ou discriminatoire</li>
          <li>Le harcèlement ou l'intimidation</li>
          <li>Les informations trompeuses ou fausses</li>
          <li>Le spam ou la publicité non autorisée</li>
          <li>Le contenu inapproprié pour les jeunes</li>
        </ul>

        <h2>5. Interactions dans les forums</h2>
        <p>Lors des discussions :</p>
        <ul>
          <li>Restez sur le sujet</li>
          <li>Citez vos sources</li>
          <li>Évitez les débats stériles</li>
          <li>Signalez les comportements inappropriés</li>
        </ul>

        <h2>6. Propriété intellectuelle</h2>
        <p>Lorsque vous partagez du contenu :</p>
        <ul>
          <li>Respectez les droits d'auteur</li>
          <li>Citez les sources</li>
          <li>N'utilisez pas de contenu protégé sans autorisation</li>
        </ul>

        <h2>7. Signalement et modération</h2>
        <p>Si vous constatez un comportement inapproprié :</p>
        <ul>
          <li>Utilisez le bouton de signalement</li>
          <li>Ne répondez pas aux provocations</li>
          <li>Contactez les modérateurs si nécessaire</li>
        </ul>

        <h2>8. Conséquences des violations</h2>
        <p>Les violations des règles peuvent entraîner :</p>
        <ul>
          <li>Un avertissement</li>
          <li>Une suspension temporaire</li>
          <li>Un bannissement permanent</li>
        </ul>

        <h2>9. Contact</h2>
        <p>
          Pour signaler un problème ou poser une question :
          <br />
          Email : community@sosplanetecongo.org
          <br />
          Téléphone : +243 XX XXX XXXX
        </p>
      </LegalPage>
      <Footer />
    </div>
  );
}
