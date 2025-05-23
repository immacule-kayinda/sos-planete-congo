const funFactsRDC = [
  // Nature & Peuples Indigènes
  "La forêt équatoriale du Congo abrite les peuples Pygmées Mbuti, connus pour leur relation symbiotique avec la nature.",
  "Les Batwa, habitants traditionnels de la région de l'Ituri, possèdent une connaissance approfondie des plantes médicinales.",
  "Les peuples autochtones congolais utilisent plus de 200 espèces de plantes pour se nourrir et se soigner.",
  "Les pygmées Aka pratiquent la chasse collective avec l'arc et les flèches, et utilisent la forêt comme panneau d'affichage d'histoires ancestrales.",
  "Les peuples Bantu de la cuvette centrale cultivent le manioc et le bananier plantain en milieu forestier clairsemé.",
  "La cosmogonie des peuples autochtones intègre l’esprit de l’okapi comme gardien de la forêt.",
  "Les communautés indigènes orchestrent des cérémonies liées au cycle lunaire pour déterminer les périodes de chasse.",
  "Les femmes Mbuti sont réputées pour leur capacité à identifier plus de 50 essences d'arbres par l'écorce.",
  "Les savoirs traditionnels pygmées incluent des recettes de décoctions à base de racines pour soigner les infections.",
  "Les chants polyphoniques des peuples autochtones servent à communiquer à travers les vallées forestières.",

  // Faune & Biodiversité Forestière
  "L'okapi, aperçu pour la première fois en 1901, ne peut vivre qu'en forêt dense, loin des milieux ouverts.",
  "Le bonobo, unique singe matriarcal, utilise des outils simples comme des feuilles pour boire.",
  "Le gorille de Grauer est la plus grande sous-espèce de gorille et ne se trouve qu’en RDC.",
  "Le pangolin géant congolais se roule en boule et peut durer jusqu’à 1 minute sous l’eau.",
  "Le céphalophe bleu adulte ne pèse que 12 kg en moyenne, malgré son apparence robuste.",
  "Le paon du Congo se camoufle au sol grâce à ses plumes aux reflets métalliques.",
  "Le céphalophe de Jentink est si discret qu'il a été observé pour la première fois en 1901.",
  "Le rat-taupe nu d'Afrique peut creuser plus de 3 km de galeries pour trouver des tubercules.",
  "Le bongo mâle porte des rayures blanches sur le dos afin de se dissimuler parmi les troncs.",
  "Le python royal congolais peut atteindre 5 mètres sans être détecté par sa coloration.",
  "Le caméléon à cornes du Kivu ajuste ses couleurs en moins de 30 secondes selon la luminosité.",
  "Le crocodile nain ne grandit pas au-delà de 1,5 mètre, s’adaptant aux cours d’eau étroits.",
  "Le hérisson africain trouve refuge dans les litières de feuilles où il se nourrit d'insectes.",
  "Le pangolin inspecte chaque fourmilière pendant 20 minutes avant de commencer à se nourrir.",
  "Les chauves-souris déplacent en une nuit plus de 40 km pour se nourrir de fruits en forêt.",

  // Écosystèmes & Interactions
  "Les termites géants construisent des termitières atteignant 6 mètres de hauteur dans la cuvette centrale.",
  "Les nids d'abeilles sauvages, suspendus aux branches, jouent un rôle clé dans la pollinisation forestière.",
  "Les plantes hépatiques, premières sur le tronc, jouent un rôle de bioindicateur de la qualité de l'air.",
  "Les lianes tressées offrent des passages aériens pour les primates et les petits mammifères.",
  "Les cichlidés des lacs environnants migrent vers la forêt inondée pendant la saison des pluies.",
  "Les papillons Charaxes parcourent jusqu'à 10 km par jour à travers la canopée.",
  "Les forêts congolaises abritent plus de 300 espèces d’oiseaux endémiques.",
  "Les singes de De Brazza doivent se méfier du léopard arboricole, un prédateur agile en forêt.",
  "Les éléphants de forêt créent des clairières qui favorisent la régénération de certaines espèces végétales.",
  "Les céphalophores, insectes fluorescents, émettent une lumière verte à la tombée de la nuit.",

  // Climate & Conservation
  "Les mangroves de la rivière Tshuapa filtrent les sédiments avant qu'ils n'atteignent le fleuve Congo.",
  "Les femmes pygmées participent aux programmes de conservation en guidant les écovolontaires.",
  "Les corridors forestiers mis en place entre Virunga et Kahuzi-Biega facilitent la dispersion génétique des primates.",
  "La réserve d'okapis est gérée conjointement par les communautés locales et l'IUCN.",
  "La réintroduction de graines dispersées par les chimpanzés aide à restaurer les zones dégradées.",
  "Les glissements de terrain dus à la déforestation affectent la nidification des oiseaux dans la région de Bas-Uele.",
  "Les programmes de suivi des gorilles utilisent des colliers GPS développés localement.",
  "Les caméras trappe-photo révèlent de nouveaux comportements nocturnes chez le pangolin.",
  "Les ONG locales forment des indigènes à la surveillance hydrologique des lacs forestiers.",
  "La permaculture appropriée se développe dans certains camps pygmées pour l’autosuffisance alimentaire.",
];

/**
 * Renvoie une fun fact aléatoire depuis le tableau funFactsRDC.
 * @returns {string} Une fun fact sélectionnée au hasard.
 */
function getRandomFunFact() {
  const index = Math.floor(Math.random() * funFactsRDC.length);
  return funFactsRDC[index];
}
export { funFactsRDC, getRandomFunFact };
