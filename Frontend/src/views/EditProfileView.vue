<template>
  <div class="edit-profile">
    <div class="profile-card">
      <div class="profile-icon">
        <i class="pi pi-user"></i>
      </div>

      <div class="profile-info">
        <h2>Pseudo</h2>
        <div class="input-group">
          <input
            v-model="username"
            type="text"
            class="profile-input"
            placeholder="Entrez votre pseudo"
          />
        </div>

        <h2>Mail</h2>
        <div class="input-group">
          <input
            v-model="email"
            type="email"
            class="profile-input"
            placeholder="Entrez votre email"
          />
        </div>

        <h2>Mots de Passe</h2>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            class="profile-input"
            placeholder="Entrez votre mot de passe"
          />
        </div>

        <h2>Confirmation de Mots de Passe</h2>
        <div class="input-group">
          <input
            v-model="confirmPassword"
            type="password"
            class="profile-input"
            placeholder="Confirmez votre mot de passe"
          />
        </div>
      </div>

      <button class="btn-modifier" @click="updateProfile">Modifier</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css"; // Import des styles PrimeIcons
import { ref } from "vue";

const username = ref("VALGX");
const email = ref("val66666677777@gmail.com");
const password = ref("");
const confirmPassword = ref("");

const updateProfile = () => {
  // Logique de mise à jour du profil
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }
  // Appel API pour mettre à jour le profil
};
</script>
