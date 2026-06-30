# CLAUDE.md — b[Ai]lly Consulting App

## Contexte du projet

Tu développes b[Ai]lly, une application web de conseil aux entreprises pour
Stéphane Bailly, consultant en organisation (non-développeur). L'application
guide le consultant dans ses missions d'audit : collecte de données, analyse IA,
génération de livrables professionnels.

Stéphane n'est pas développeur. Toute décision d'architecture majeure doit être validée avant implémentation.

## Workflow de développement

- **Pas de tests locaux** — tout passe par un push sur la branche `develop`
- Vercel détecte le push et déploie automatiquement
- Branche `main` = production stable uniquement
- Repo GitHub : https://github.com/spontiniweb/bailly-consulting

## Stack technique

- Framework : Next.js 15 (App Router)
- UI : Tailwind CSS + shadcn/ui
- Base de données : Prisma + SQLite (dev) / PostgreSQL (prod)
- Auth : NextAuth.js avec rôles (admin, consultant, client)
- IA : Claude API Anthropic — **non connecté pour l'instant**
- Transcription : Whisper API — **non connecté pour l'instant**
- Stockage : OneDrive via Microsoft Graph API — **non connecté pour l'instant**
- Hébergement : Vercel

## Règles de développement

1. Code propre, commenté en français
2. Créer les migrations Prisma après chaque modification du schéma
3. Utiliser les composants shadcn/ui existants en priorité
4. Chaque page doit être responsive (mobile-first)
5. Toujours valider les formulaires côté serveur ET côté client
6. Ne jamais exposer les clés API dans le code — utiliser `.env.local`
7. Tenir `.env.example` à jour à chaque ajout de variable

## Architecture des dossiers

```
app/
  (auth)/           # Pages de connexion/inscription
  (dashboard)/      # Zone connectée consultant
    projets/        # Gestion des projets clients
    audit/          # Module collecte d'audit
    analyse/        # Module IA et synthèse
    livrables/      # Génération de rapports
    admin/          # Administration (Stéphane uniquement)
  (client)/         # Zone client (accès restreint)
components/         # Composants réutilisables
lib/
  ai/               # Appels Claude API (à brancher plus tard)
  onedrive/         # Intégration Microsoft Graph (à brancher plus tard)
  auth/             # Configuration NextAuth
prisma/             # Schéma et migrations BDD
```

## Modules — Ordre de développement

### Phase 1 — Fondations
- [ ] Init projet Next.js + Tailwind + shadcn/ui
- [ ] Schéma Prisma : User, Project, Role
- [ ] Authentification NextAuth (email/password)
- [ ] Layout dashboard avec navigation latérale
- [ ] Page d'accueil (liste des projets)

### Phase 2 — Gestion des projets
- [ ] CRUD complet des projets clients
- [ ] Système d'invitation des utilisateurs par email
- [ ] Tableau de bord par projet (KPIs, progression)
- [ ] Éditeur d'organigramme
- [ ] Gestion des rôles et permissions par projet

### Phase 3 — Module Audit
- [ ] Génération IA de questionnaires (Claude API)
- [ ] Interface de réponse aux questionnaires (côté client)
- [ ] Suivi en temps réel des taux de complétion
- [ ] Enregistrement et upload de fichiers audio
- [ ] Transcription automatique (Whisper API)
- [ ] Analyse sémantique des interviews (Claude API)
- [ ] Inventaire des outils SI

### Phase 4 — Analyse IA
- [ ] Synthèse globale de l'audit (Claude API)
- [ ] Cartographie des pain points
- [ ] Plan de recommandations (quick wins + long terme)
- [ ] Calcul ROI estimé
- [ ] Roadmap interactive

### Phase 5 — Livrables
- [ ] Génération rapport PDF complet
- [ ] Export Word (.docx)
- [ ] Sauvegarde OneDrive automatique
- [ ] Portail client (accès aux livrables publiés)

### Phase 6 — Finalisation
- [ ] Module de gestion du temps (feuilles de temps)
- [ ] Tests end-to-end
- [ ] Déploiement Vercel production
- [ ] Documentation utilisateur

## Sécurité et multi-tenant

- Isolation stricte : un utilisateur ne voit que ses projets
- Toutes les requêtes API vérifient la session et les permissions
- Les données clients ne sont jamais envoyées à des tiers sauf Claude API
- Chaque appel Claude inclut une instruction système de confidentialité

## Contact / propriétaire

Stéphane Bailly — spontiniweb@free.fr
