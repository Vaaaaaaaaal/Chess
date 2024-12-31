import { useToast } from 'primevue/usetoast';

export function handleServerError(error: any) {
  const toast = useToast();
  console.error('Server Error:', error);

  if (error.response) {
    // Erreur de réponse du serveur
    const status = error.response.status;
    const message = error.response.data?.message || 'Une erreur est survenue';

    toast.add({
      severity: 'error',
      summary: `Erreur ${status}`,
      detail: message,
      life: 5000,
    });
  } else if (error.request) {
    // Pas de réponse du serveur
    toast.add({
      severity: 'error',
      summary: 'Erreur de réseau',
      detail: 'Impossible de contacter le serveur',
      life: 5000,
    });
  } else {
    // Autre erreur
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Une erreur inattendue est survenue',
      life: 5000,
    });
  }
} 