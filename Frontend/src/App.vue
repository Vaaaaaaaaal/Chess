<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/">
          <img src="@/assets/Logo.png" alt="ChessApp Logo" class="logo" />
        </router-link>
      </div>
      <ul class="navbar-menu">
        <li><router-link to="/game">Jouer</router-link></li>
        <li><router-link to="/rank">Classement</router-link></li>
        <li>
          <router-link to="/profile"><i class="pi pi-user"></i></router-link>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 ChessApp. Tous droits réservés.</p>
        <ul class="footer-links">
          <li><a href="#">Conditions d'utilisation</a></li>
          <li><a href="#">Politique de confidentialité</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import "primeicons/primeicons.css";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
