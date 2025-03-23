/**
 * Fonction pour générer une couleur déterministe basée sur l'ID
 */
export function getEventColor(eventId: string): 'blue' | 'green' | 'red' | 'orange' | 'purple' {
  const colors = ['blue', 'green', 'red', 'orange', 'purple'] as const;
  const hash = eventId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

/**
 * Formater l'heure d'un événement pour l'affichage
 */
export function formatEventTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
} 