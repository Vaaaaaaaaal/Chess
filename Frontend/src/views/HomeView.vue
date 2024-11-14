<template>
  <div class="home">
    <h1>Bienvenue sur ChessApp</h1>
    <p class="subtitle">
      Jouez aux échecs, suivez vos statistiques et améliorez votre jeu !
    </p>

    <div class="actions">
      <button class="btn primary" @click="$router.push('/game')">
        Nouvelle partie
      </button>
      <button class="btn secondary">Voir le classement</button>
    </div>

    <section class="chess-quote">
      <blockquote>
        "L'art le plus élevé du joueur d'échecs est de ne pas permettre à votre
        adversaire de vous montrer ce qu'il peut faire."
      </blockquote>
      <cite>Kasparov</cite>
    </section>

    <section class="features-grid">
      <div class="feature-card">
        <h3>Jeu local</h3>
        <p>
          Jouez avec un ami sur le même ordinateur pour des parties
          passionnantes.
        </p>
      </div>
      <div class="feature-card">
        <h3>Statistiques personnelles</h3>
        <p>Suivez votre progression et analysez vos performances.</p>
      </div>
      <div class="feature-card">
        <h3>Historique des parties</h3>
        <p>Revisionnez vos anciennes parties et apprenez de vos expériences.</p>
      </div>
      <div class="feature-card">
        <h3>Classement des joueurs</h3>
        <p>
          Comparez-vous aux autres joueurs et visez le sommet du classement.
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
  background-color: #1e1e1e;
  color: #e0e0e0;
  min-height: 100vh;
}

h1,
h2,
h3 {
  color: #ff6b6b;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 2rem;
}

.actions {
  margin: 2rem 0;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.primary {
  background-color: #ff6b6b;
  color: #1e1e1e;
}

.primary:hover {
  background-color: #ff8787;
}

.secondary {
  background-color: #4a4a4a;
  color: #e0e0e0;
}

.secondary:hover {
  background-color: #5a5a5a;
}

.chess-quote {
  margin: 3rem 0;
  font-style: italic;
  color: #b0b0b0;
}

blockquote {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

cite {
  font-size: 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.feature-card {
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  margin-top: 0;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
