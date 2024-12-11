<template>
  <div class="flex justify-content-center align-items-center min-h-screen bg-gray-100">
    <Card class="w-full md:w-6 lg:w-4">
      <template #title>
        <div class="text-center mb-4">
          <h1>Mon compte</h1>
        </div>
      </template>
      <template #content>
        <div class="text-center">
          <p class="mb-4">Bonjour {{ username }}</p>
          <div class="flex flex-column gap-3">
            <Button label="Voir mon historique" @click="() => router.push('/history/me')" />
            <Button label="Voir mes statistiques" @click="() => router.push('/stats/me')" />
            <Button
              label="Se déconnecter"
              severity="danger"
              @click="handleLogout"
              :loading="loading"
            />
          </div>
        </div>
      </template>
    </Card>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const { username, loading } = storeToRefs(authStore);

const handleLogout = async () => {
  try {
    loading.value = true;

    authStore.logout();

    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Vous avez été déconnecté avec succès',
      life: 3000,
    });

    router.push('/login');
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Une erreur est survenue lors de la déconnexion',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.p-card {
  border-radius: 1rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
