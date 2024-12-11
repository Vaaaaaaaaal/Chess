<template>
  <Toast />

  <div class="layout">
    <AppMenu />

    <main>
      <RouterView />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 ChessApp. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import AppMenu from './AppMenu.vue';
</script>

<style>
main {
  padding-bottom: 60px; /* Ajouter un padding pour éviter que le contenu ne soit caché par le footer */
}

.footer {
  background-color: #2a2a2a;
  color: #e0e0e0;
  padding: 1rem 0;
  margin-top: 1rem; /* Ajouté un petit espace au-dessus du footer */
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.footer-links {
  list-style-type: none;
  display: flex;
  padding: 0;
}

.footer-links li {
  margin-left: 1rem;
}

.footer-links a {
  color: #e0e0e0;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #ff6b6b;
}
</style>
