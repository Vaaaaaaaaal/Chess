<template>
  <header class="navbar">
    <div class="logo">
      <router-link to="/">
        <img src="/assets/Logo.png" alt="Logo" class="logo" />
      </router-link>
    </div>

    <nav>
      <ul>
        <li>
          <router-link v-slot="{ href, navigate }" to="/leaderboard" custom>
            <a :href="href" @click="navigate">
              <p>Classement</p>
            </a>
          </router-link>
        </li>

        <li v-if="isAuthenticated">
          <router-link v-slot="{ href, navigate }" to="/profile" custom>
            <a :href="href" @click="navigate">
              <p>Mon compte</p>
            </a>
          </router-link>
        </li>

        <li v-if="!isAuthenticated">
          <a class="create-account" href="/register"> Créer un compte </a>
        </li>
        <li v-if="!isAuthenticated">
          <a class="login-btn" href="/login"> Se connecter </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
</script>
