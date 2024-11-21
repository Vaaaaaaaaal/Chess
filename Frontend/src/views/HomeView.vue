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
