<template>
  <nav class="main-nav">
    <Logo />
    <div class="nav-links">
      <RouterLink to="/" class="nav-link">Accueil</RouterLink>
      <RouterLink to="/stats" class="nav-link">Statistiques</RouterLink>
    </div>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Logo from './components/Logo.vue';
</script>

<style scoped>
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #42b883;
}
</style>
