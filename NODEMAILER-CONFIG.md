# Configuration Nodemailer - SOS Planète Congo

## 📧 Configuration Email

Ce guide vous aide à configurer et vérifier nodemailer pour l'envoi d'emails.

## 🔧 Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local` :

```env
# Configuration SMTP (obligatoire)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app

# Expéditeur par défaut (optionnel)
SMTP_FROM="SOS Planète Congo <noreply@sosplanetecongo.org>"

# URL de base pour les liens dans les emails
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🛠️ Configurations SMTP populaires

### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app  # Pas votre mot de passe normal !
```

**Important pour Gmail :**
1. Activez l'authentification à deux facteurs
2. Générez un "mot de passe d'application" spécifique
3. Utilisez ce mot de passe d'application pour `SMTP_PASS`

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=votre-email@outlook.com
SMTP_PASS=votre-mot-de-passe
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=votre-email@yahoo.com
SMTP_PASS=votre-mot-de-passe-app
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=votre-api-key-sendgrid
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@votre-domaine.mailgun.org
SMTP_PASS=votre-mot-de-passe-mailgun
```

## 🧪 Test de configuration

### 1. Via l'interface admin

1. Connectez-vous en tant qu'administrateur
2. Allez sur : `http://localhost:3000/api/test-email`
3. Utilisez l'API de test (voir ci-dessous)

### 2. Via API directe

**Vérifier la configuration :**
```bash
curl -X GET http://localhost:3000/api/test-email \
  -H "Content-Type: application/json"
```

**Envoyer un email de test :**
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "testType": "full"
  }'
```

**Vérifier seulement la config :**
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "testType": "config-only"
  }'
```

## 🚨 Dépannage

### Erreur : "Invalid login"
- ✅ Vérifiez `SMTP_USER` et `SMTP_PASS`
- ✅ Pour Gmail : utilisez un mot de passe d'application
- ✅ Vérifiez que l'authentification 2FA est activée (Gmail)

### Erreur : "Connection timeout"
- ✅ Vérifiez `SMTP_HOST` et `SMTP_PORT`
- ✅ Vérifiez votre connexion internet
- ✅ Certains FAI bloquent le port 587, essayez le port 465

### Erreur : "Certificate error"
- ✅ Configuration automatiquement gérée avec `rejectUnauthorized: false`
- ✅ Si problème persiste, contactez votre fournisseur SMTP

### Erreur : "Rate limit exceeded"
- ✅ Vous envoyez trop d'emails rapidement
- ✅ Attendez quelques minutes avant de réessayer
- ✅ Considérez un service SMTP premium (SendGrid, Mailgun)

## 📊 Status des variables d'environnement

| Variable | Status | Description |
|----------|--------|-------------|
| `SMTP_HOST` | ✅ Obligatoire | Serveur SMTP |
| `SMTP_PORT` | ⚠️ Optionnel | Port (défaut: 587) |
| `SMTP_USER` | ✅ Obligatoire | Nom d'utilisateur |
| `SMTP_PASS` | ✅ Obligatoire | Mot de passe |
| `SMTP_FROM` | ⚠️ Optionnel | Expéditeur par défaut |

## 🔍 Logs de débogage

Les logs nodemailer apparaissent dans la console du serveur :

```
✅ Configuration nodemailer validée avec succès
✅ Email envoyé avec succès à test@example.com - Message ID: abc123
❌ Erreur lors de l'envoi d'email à test@example.com: Invalid login
```

## 📧 Utilisation dans le code

```typescript
import { sendMail, verifyMailerConfig } from "@/lib/mailer";

// Vérifier la configuration
const configCheck = await verifyMailerConfig();
if (!configCheck.success) {
  console.error("Config invalide:", configCheck.error);
}

// Envoyer un email
const result = await sendMail({
  to: "destinataire@example.com",
  subject: "Mon sujet",
  html: "<h1>Bonjour !</h1>",
  from: "expediteur@example.com" // optionnel
});

if (result.success) {
  console.log("Email envoyé :", result.messageId);
} else {
  console.error("Erreur :", result.error);
}
```

## 🛡️ Sécurité

- ✅ Ne jamais commiter les vraies valeurs dans `.env`
- ✅ Utilisez des mots de passe d'application pour Gmail
- ✅ Limitez les permissions des comptes email utilisés
- ✅ Surveillez les logs pour détecter les abus
- ✅ Utilisez HTTPS en production

## 🚀 En production

1. **Variables d'environnement** : Configurez sur votre plateforme (Vercel, Netlify, etc.)
2. **Service SMTP professionnel** : Considérez SendGrid, Mailgun, ou Amazon SES
3. **Monitoring** : Surveillez les taux de livraison et les bounces
4. **Rate limiting** : Implémentez des limites pour éviter le spam

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez les variables d'environnement
2. Testez avec l'API `/api/test-email`
3. Consultez les logs du serveur
4. Vérifiez la documentation de votre fournisseur SMTP 