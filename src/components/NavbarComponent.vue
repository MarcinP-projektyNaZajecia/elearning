<template>
  <nav class="navbar">
    <router-link class="nav-link" to="/">Strona główna</router-link>
    <router-link class="nav-link" to="/scrum">Podstawy Scruma</router-link>
    <router-link class="nav-link" to="/quiz">Quiz</router-link>
    <router-link class="nav-link" to="/download-materials">Linki i materiały do pobrania</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent'
}
</script>

<style scoped src="../assets/styles.css"></style>
