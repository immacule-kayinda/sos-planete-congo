# Guide Session Database Strategy

## Changements apportés

### 1. Configuration NextAuth (auth.ts)
- ✅ Changé de `strategy: "jwt"` à `strategy: "database"`
- ✅ Supprimé les callbacks JWT (non nécessaires avec database)
- ✅ Ajouté validation en temps réel dans le callback session
- ✅ Utilise automatiquement PrismaAdapter pour gérer les sessions

### 2. Avantages de la stratégie Database

#### Sécurité
- **Sessions stockées en base** : Contrôle total côté serveur
- **Invalidation immédiate** : Suppression possible des sessions en base
- **Validation en temps réel** : Vérification de l'état utilisateur à chaque requête
- **Nettoyage automatique** : Sessions expirées supprimées automatiquement

#### Contrôle
- **Gestion centralisée** : Toutes les sessions visibles en base
- **Révocation sélective** : Possibilité d'invalider des sessions spécifiques
- **Audit trail** : Historique des connexions disponible

### 3. Utilitaires créés

#### Session Utils (`src/lib/session-utils.ts`)
```typescript
// Invalider toutes les sessions d'un utilisateur
await invalidateUserSessions(userId);

// Nettoyer les sessions expirées
await cleanupExpiredSessions();

// Invalider une session spécifique
await invalidateSession(sessionToken);

// Compter les sessions actives
const count = await getUserActiveSessionsCount(userId);

// Obtenir toutes les sessions actives
const sessions = await getUserActiveSessions(userId);
```

#### API Admin (`/api/admin/sessions`)
```bash
# Nettoyer toutes les sessions expirées
DELETE /api/admin/sessions?action=cleanup

# Invalider toutes les sessions d'un utilisateur
DELETE /api/admin/sessions?userId=USER_ID

# Voir les sessions actives d'un utilisateur
GET /api/admin/sessions?userId=USER_ID
```

#### Tâche Cron (`/api/cron/cleanup-sessions`)
```bash
# Nettoyer automatiquement (avec CRON_SECRET)
GET /api/cron/cleanup-sessions
Authorization: Bearer YOUR_CRON_SECRET
```

### 4. Variables d'environnement à ajouter

```env
# Pour la tâche cron de nettoyage (optionnel)
CRON_SECRET=your_secret_key_here
```

### 5. Cas d'usage pratiques

#### Déconnexion forcée d'un utilisateur
```typescript
// Dans votre code admin
await invalidateUserSessions("user-id-123");
```

#### Nettoyage périodique
```typescript
// Exécuter tous les jours à minuit
await cleanupExpiredSessions();
```

#### Limite de sessions concurrentes
```typescript
const activeCount = await getUserActiveSessionsCount(userId);
if (activeCount >= 3) {
  // Supprimer les plus anciennes sessions
  const sessions = await getUserActiveSessions(userId);
  await invalidateSession(sessions[sessions.length - 1].sessionToken);
}
```

### 6. Surveillance et maintenance

#### Vérifier les sessions actives
```sql
-- Directement en base
SELECT userId, COUNT(*) as sessions_count 
FROM Session 
WHERE expires > NOW() 
GROUP BY userId;
```

#### Nettoyer manuellement
```sql
-- Supprimer les sessions expirées
DELETE FROM Session WHERE expires < NOW();
```

### 7. Sécurité additionnelle

Avec la stratégie database, vous pouvez maintenant :
- **Détecter les utilisateurs supprimés** : Callback session vérifie `isActive`
- **Révoquer l'accès instantanément** : Suppression de sessions en base
- **Auditer les connexions** : Logs des sessions disponibles
- **Limiter les sessions concurrentes** : Contrôle du nombre de sessions

### 8. Migration automatique

La migration de JWT vers Database est **transparente** :
- ✅ Pas de perte de données utilisateur
- ✅ Pas de reconfiguration côté client
- ✅ Sessions existantes seront recréées à la prochaine connexion
- ✅ Même interface utilisateur

## Résultat final

Maintenant, quand vous réinitialisez la base de données :
1. ✅ Toutes les sessions sont automatiquement invalidées
2. ✅ Les utilisateurs sont redirigés vers la connexion
3. ✅ Aucun accès non autorisé possible
4. ✅ Contrôle total sur les sessions actives

**Votre problème de sécurité est résolu !** 🎉 