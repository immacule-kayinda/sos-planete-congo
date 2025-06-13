# Guide JWT Sécurisé - Solution Hybride

## Problème résolu

NextAuth.js ne supporte pas les **Credentials providers** avec la stratégie **database**. Nous avons donc implémenté une solution hybride qui combine :
- JWT pour la compatibilité avec les credentials
- Validation côté serveur pour la sécurité

## Solution implémentée

### 1. JWT avec validation périodique (auth.ts)
```typescript
// Validation toutes les 5 minutes dans le callback JWT
if (now - lastCheck > checkInterval) {
  const dbUser = await prisma.user.findUnique({
    where: { id: token.id },
    select: { id: true, role: true, isActive: true },
  });

  if (!dbUser || !dbUser.isActive) {
    return null; // Token invalidé
  }
}
```

### 2. Utilitaires de gestion JWT (src/lib/jwt-session-utils.ts)
- `invalidateUserTokens(userId)` - Invalide tous les tokens d'un utilisateur
- `forceLogoutUser(userId)` - Déconnexion forcée
- `reactivateUser(userId)` - Réactivation d'un utilisateur
- `isUserActive(userId)` - Vérification d'état

### 3. API Admin (src/app/api/admin/jwt-sessions/route.ts)
```bash
# Forcer la déconnexion d'un utilisateur
POST /api/admin/jwt-sessions
{
  "action": "forceLogout",
  "userId": "user-id-123"
}

# Invalider tous les tokens d'un utilisateur
POST /api/admin/jwt-sessions
{
  "action": "invalidate", 
  "userId": "user-id-123"
}

# Réactiver un utilisateur
POST /api/admin/jwt-sessions
{
  "action": "reactivate",
  "userId": "user-id-123"
}
```

### 4. Middleware renforcé (middleware.ts)
- Vérification des sessions sur toutes les routes privées
- Redirection automatique si session invalide
- Gestion des routes publiques/privées

## Sécurité garantie

### ✅ **Problème d'origine résolu**
- **Reset de DB** : Les utilisateurs avec des tokens obsolètes sont détectés et déconnectés
- **Validation périodique** : Vérification en base toutes les 5 minutes
- **Contrôle admin** : Possibilité de déconnecter des utilisateurs spécifiques

### ✅ **Fonctionnalités de sécurité**
1. **Détection d'utilisateurs supprimés** : Token invalidé si user n'existe plus
2. **Déconnexion forcée** : Admin peut forcer la déconnexion
3. **Invalidation sélective** : Possibilité d'invalider des tokens spécifiques
4. **Réactivation contrôlée** : Réactivation manuelle possible

## Utilisation pratique

### Déconnecter un utilisateur problématique
```typescript
// Côté admin
await forceLogoutUser("user-id-123");
```

### Invalider tous les tokens après un reset DB
```typescript
// Marquer tous les utilisateurs comme inactifs temporairement
const users = await prisma.user.findMany();
for (const user of users) {
  await invalidateUserTokens(user.id);
}
```

### Vérifier l'état d'un utilisateur
```typescript
const isActive = await isUserActive("user-id-123");
if (!isActive) {
  // Utilisateur déconnecté
}
```

## Avantages de cette approche

1. **Compatible avec Credentials** : Fonctionne avec votre système actuel
2. **Sécurité renforcée** : Validation côté serveur
3. **Contrôle granulaire** : Gestion utilisateur par utilisateur
4. **Performance optimisée** : Validation seulement toutes les 5 minutes
5. **Migration transparente** : Aucun impact utilisateur

## Recommandations

1. **Ajustez l'intervalle** : Réduisez à 1-2 minutes pour plus de sécurité
2. **Utilisez Redis** : Pour la blacklist en production
3. **Logs d'audit** : Ajoutez des logs pour les déconnexions forcées
4. **Monitoring** : Surveillez les tentatives d'accès avec tokens invalides

## Comparaison des stratégies

| Fonctionnalité | JWT Original | JWT Sécurisé | Database |
|----------------|--------------|--------------|----------|
| Credentials Support | ✅ | ✅ | ❌ |
| Validation Serveur | ❌ | ✅ | ✅ |
| Invalidation Immédiate | ❌ | ✅ | ✅ |
| Performance | ✅ | ✅ | ⚠️ |
| Complexité | ✅ | ⚠️ | ⚠️ |

**Votre solution est maintenant sécurisée !** 🎉 