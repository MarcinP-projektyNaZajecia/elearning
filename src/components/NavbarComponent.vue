<template>
  <nav class="navbar">
    <router-link class="nav-link" active-class="active-link" to="/">Strona główna</router-link>
    <router-link class="nav-link" active-class="active-link" to="/scrum">Scrum</router-link>
    <router-link class="nav-link" active-class="active-link" to="/quiz">Quiz</router-link>
    <router-link class="nav-link" active-class="active-link" to="/download-materials">Linki i materiały do pobrania</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent'
}
</script>

<style scoped src="../assets/styles.css"></style>
