"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import { LegalPage } from "@/components/ui/legal-page";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LegalPage title="Conditions d'utilisation" lastUpdated="1er Mars 2024">
        <h2>1. Acceptation des conditions</h2>
        <p>
          En accédant et en utilisant SOS Planète Congo, vous acceptez d'être
          lié par ces conditions d'utilisation. Si vous n'acceptez pas ces
          conditions, veuillez ne pas utiliser notre plateforme.
        </p>

        <h2>2. Description du service</h2>
        <p>
          SOS Planète Congo est une plateforme éducative dédiée à la
          sensibilisation environnementale et à l'éducation des jeunes en
          République Démocratique du Congo. Nous proposons :
        </p>
        <ul>
          <li>Des ressources éducatives sur l'environnement</li>
          <li>Des activités de sensibilisation</li>
          <li>Des programmes de formation</li>
          <li>Une communauté d'apprentissage</li>
        </ul>

        <h2>3. Compte utilisateur</h2>
        <p>
          Pour accéder à certaines fonctionnalités, vous devrez créer un compte.
          Vous êtes responsable de :
        </p>
        <ul>
          <li>Maintenir la confidentialité de vos identifiants</li>
          <li>Toutes les activités sur votre compte</li>
          <li>Fournir des informations exactes et à jour</li>
        </ul>

        <h2>4. Utilisation acceptable</h2>
        <p>Vous acceptez de ne pas :</p>
        <ul>
          <li>Utiliser la plateforme de manière illégale</li>
          <li>Publier du contenu inapproprié ou offensant</li>
          <li>Perturber le fonctionnement normal du service</li>
          <li>Collecter des données d'autres utilisateurs sans consentement</li>
        </ul>

        <h2>5. Propriété intellectuelle</h2>
        <p>
          Tout le contenu présent sur SOS Planète Congo est protégé par les
          droits d'auteur. Vous ne pouvez pas :
        </p>
        <ul>
          <li>Copier ou reproduire le contenu sans autorisation</li>
          <li>Modifier ou créer des œuvres dérivées</li>
          <li>Utiliser le contenu à des fins commerciales</li>
        </ul>

        <h2>6. Limitation de responsabilité</h2>
        <p>SOS Planète Congo n'est pas responsable :</p>
        <ul>
          <li>Des contenus générés par les utilisateurs</li>
          <li>Des pertes de données ou interruptions de service</li>
          <li>Des dommages indirects résultant de l'utilisation du service</li>
        </ul>

        <h2>7. Modifications des conditions</h2>
        <p>
          Nous nous réservons le droit de modifier ces conditions à tout moment.
          Les modifications prendront effet dès leur publication sur la
          plateforme.
        </p>

        <h2>8. Contact</h2>
        <p>
          Pour toute question concernant ces conditions, veuillez nous contacter
          à :
          <br />
          Email : contact@sosplanetecongo.org
          <br />
          Téléphone : +243 XX XXX XXXX
        </p>
      </LegalPage>
      <Footer />
    </div>
  );
}
