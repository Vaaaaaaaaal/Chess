<template>
  <div id="app">
    <nav class="navbar" v-if="showNav">
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
        <li>
          <a href="#" @click.prevent="handleLogout">
            <i class="pi pi-sign-out"></i>
          </a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 ChessApp. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/auth/useAuth";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const { logout } = useAuth();

const showNav = computed(() => {
  const publicRoutes = ["login", "register", "not-found"];
  return !publicRoutes.includes(route.name as string);
});

const handleLogout = async () => {
  await logout();
  router.push("/login");
};
</script>
