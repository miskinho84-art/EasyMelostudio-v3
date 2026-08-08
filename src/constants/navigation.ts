/**
 * Définition centralisée des routes de l'application.
 * Toute nouvelle page doit être ajoutée ici pour apparaître
 * dans la navigation (Navbar, Sidebar, Footer).
 */

export type NavItem = {
  label: string;
  href: string;
};

/** Liens visibles pour un visiteur non connecté (Navbar publique) */
export const publicNavItems: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

/** Liens d'authentification */
export const authNavItems: NavItem[] = [
  { label: 'Connexion', href: '/connexion' },
  { label: 'Inscription', href: '/inscription' },
];

/** Accès nommés (plus sûrs que des indices de tableau) */
export const loginNavItem: NavItem = authNavItems[0]!;
export const signupNavItem: NavItem = authNavItems[1]!;

/** Liens visibles dans la Sidebar une fois connecté (espace applicatif) */
export const dashboardNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Créer une chanson', href: '/creer-une-chanson' },
  { label: 'Bibliothèque', href: '/bibliotheque' },
  { label: 'Historique', href: '/historique' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Paramètres', href: '/parametres' },
];

/** Liens légaux/secondaires affichés dans le Footer */
export const footerNavItems: NavItem[] = [
  { label: 'Confidentialité', href: '/confidentialite' },
  { label: 'Conditions générales', href: '/conditions' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const APP_NAME = 'EasyMelo Studio';
