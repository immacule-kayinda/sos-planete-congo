const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Configuration du système de news...\n');

try {
    // 1. Générer le client Prisma
    console.log('📦 Génération du client Prisma...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Client Prisma généré avec succès\n');

    // 2. Exécuter les migrations
    console.log('🔄 Exécution des migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('✅ Migrations exécutées avec succès\n');

    // 3. Seeder les données
    console.log('🌱 Seeding des données de news...');
    execSync('npx tsx prisma/news-seed.ts', { stdio: 'inherit' });
    console.log('✅ Données de news ajoutées avec succès\n');

    console.log('🎉 Configuration terminée ! Le système de news est prêt à être utilisé.');
    console.log('\n📝 Prochaines étapes :');
    console.log('1. Accédez à /dashboard/news pour gérer les articles');
    console.log('2. Visitez /news pour voir les articles publics');
    console.log('3. Consultez NEWS-SYSTEM.md pour plus d\'informations');

} catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
    process.exit(1);
} 