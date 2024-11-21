<template>
  <div class="login">
    <div class="login-card">
      <h1 class="login-title">Connexion</h1>

      <div class="login-info">
        <h2>Mail</h2>
        <div class="input-group">
          <input
            v-model="email"
            type="email"
            class="login-input"
            placeholder="Entrez votre email"
          />
        </div>

        <h2>Mots de Passe</h2>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            class="login-input"
            placeholder="Entrez votre mot de passe"
          />
        </div>
      </div>

      <button class="btn-login" @click="handleLogin">Se connecter</button>

      <div class="register-link">
        Pas encore de compte ?
        <router-link to="/register" class="link">S'inscrire</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    // Appel API pour la connexion
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Stockage du token dans le localStorage
      localStorage.setItem("token", data.token);
      router.push("/"); // Redirection vers la page d'accueil
    } else {
      const error = await response.json();
      alert(error.message || "Erreur lors de la connexion");
    }
  } catch (error) {
    alert("Erreur lors de la connexion");
  }
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #1e1e1e;
}

.login-card {
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-title {
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.login-info {
  padding: 0 1rem;
  margin-bottom: 2rem;
}

h2 {
  color: white;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: normal;
}

.input-group {
  margin-bottom: 1.5rem;
}

.login-input {
  width: 100%;
  padding: 0.8rem;
  background-color: #1a1a1a;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
}

.login-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #ff6b6b;
}

.btn-login {
  width: 100%;
  padding: 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1rem;
}

.btn-login:hover {
  background-color: #ff5252;
}

.register-link {
  text-align: center;
  color: white;
  font-size: 0.9rem;
}

.link {
  color: #ff6b6b;
  text-decoration: none;
  margin-left: 0.5rem;
}

.link:hover {
  text-decoration: underline;
}
</style>
