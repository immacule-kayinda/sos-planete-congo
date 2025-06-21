"use client";

import Header from "@/components/header";
import Footer from "@/components/ui/footer";
import { LegalPage } from "@/components/ui/legal-page";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LegalPage
        title="Politique de confidentialité"
        lastUpdated="1er Mars 2024"
      >
        <h2>1. Introduction</h2>
        <p>
          SOS Planète Congo s'engage à protéger votre vie privée. Cette
          politique de confidentialité explique comment nous collectons,
          utilisons et protégeons vos informations personnelles.
        </p>

        <h2>2. Informations que nous collectons</h2>
        <p>Nous collectons les informations suivantes :</p>
        <ul>
          <li>
            <strong>Informations personnelles :</strong>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Âge et niveau d'études</li>
            </ul>
          </li>
          <li>
            <strong>Informations d'utilisation :</strong>
            <ul>
              <li>Pages visitées</li>
              <li>Temps passé sur le site</li>
              <li>Interactions avec le contenu</li>
              <li>Progrès dans les cours</li>
            </ul>
          </li>
        </ul>

        <h2>3. Utilisation des informations</h2>
        <p>Nous utilisons vos informations pour :</p>
        <ul>
          <li>Fournir et améliorer nos services éducatifs</li>
          <li>Personnaliser votre expérience d'apprentissage</li>
          <li>Communiquer avec vous sur les mises à jour et événements</li>
          <li>Analyser et améliorer nos services</li>
        </ul>

        <h2>4. Protection des données</h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité appropriées pour
          protéger vos informations :
        </p>
        <ul>
          <li>Chiffrement des données sensibles</li>
          <li>Accès restreint aux informations personnelles</li>
          <li>Surveillance régulière de nos systèmes</li>
          <li>Formation de notre personnel à la sécurité</li>
        </ul>

        <h2>5. Partage des informations</h2>
        <p>Nous ne partageons vos informations qu'avec :</p>
        <ul>
          <li>
            Les prestataires de services nécessaires au fonctionnement de la
            plateforme
          </li>
          <li>Les autorités légales si requis par la loi</li>
          <li>Les partenaires éducatifs avec votre consentement</li>
        </ul>

        <h2>6. Vos droits</h2>
        <p>Vous avez le droit de :</p>
        <ul>
          <li>Accéder à vos informations personnelles</li>
          <li>Corriger les informations inexactes</li>
          <li>Demander la suppression de vos données</li>
          <li>Retirer votre consentement à tout moment</li>
        </ul>

        <h2>7. Cookies et technologies similaires</h2>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience. Vous
          pouvez contrôler les cookies via les paramètres de votre navigateur.
        </p>

        <h2>8. Modifications de la politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité. Les
          modifications seront publiées sur cette page avec une nouvelle date de
          mise à jour.
        </p>

        <h2>9. Contact</h2>
        <p>
          Pour toute question concernant notre politique de confidentialité,
          contactez-nous à :
          <br />
          Email : privacy@sosplanetecongo.org
          <br />
          Téléphone : +243 XX XXX XXXX
        </p>
      </LegalPage>
      <Footer />
    </div>
  );
}
