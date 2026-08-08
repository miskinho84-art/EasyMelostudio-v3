export const MOTIVATIONAL_QUOTES: string[] = [
  "La musique commence là où s'arrêtent les mots.",
  'Chaque grande chanson commence par une simple idée.',
  "L'IA compose, votre émotion signe.",
  "Aujourd'hui est un bon jour pour créer quelque chose d'unique.",
  'Une idée. Un style. Une chanson qui vous ressemble.',
  "La créativité n'attend pas l'inspiration, elle la provoque.",
  'Votre prochaine chanson préférée commence maintenant.',
];

export function getQuoteOfTheDay(): string {
  const dayIndex = new Date().getDate() % MOTIVATIONAL_QUOTES.length;
  return MOTIVATIONAL_QUOTES[dayIndex] ?? MOTIVATIONAL_QUOTES[0]!;
}

export function getGreetingWord(hour: number): string {
  if (hour < 5) return 'Bonsoir';
  if (hour < 18) return 'Bonjour';
  return 'Bonsoir';
}

export function getDynamicMessage(hour: number): string {
  if (hour < 12) return 'Prêt à composer votre première chanson du jour ?';
  if (hour < 18) return "Encore plein d'idées à transformer en musique aujourd'hui.";
  return 'Une bonne soirée pour finir une chanson en beauté.';
}
