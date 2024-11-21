<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/">
          <img src="@/assets/Logo.png" alt="ChessApp Logo" class="logo" />
        </router-link>
      </div>
      <ul class="navbar-menu">
        <li><router-link to="/play">Jouer</router-link></li>
        <li><router-link to="/leaderboard">Classement</router-link></li>
        <li><router-link to="/profile">Profil</router-link></li>
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #1e1e1e;
  color: #e0e0e0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #2a2a2a;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  width: auto;
}

.navbar-menu {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-menu li {
  margin-left: 1rem;
}

.navbar-menu a {
  color: #e0e0e0;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-menu a:hover,
.navbar-menu a.router-link-active {
  color: #ff6b6b;
}

.main-content {
  flex: 1;
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

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    margin-top: 1rem;
  }

  .footer-links li {
    margin: 0 0.5rem;
  }
}
</style>
