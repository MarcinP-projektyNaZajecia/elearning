<template>
  <nav class="navbar">
    <router-link to="/">Strona główna</router-link>
    <router-link to="/scrum">Podstawy Scruma</router-link>
    <router-link to="/quiz">Quiz</router-link>
    <router-link to="/download-materials">Materiały do pobrania</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped src="../assets/styles.css"></style>
