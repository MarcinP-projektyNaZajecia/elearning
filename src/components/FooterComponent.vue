<template>
  <footer class="footer">
    <p>© 2024 Portal E-Learningowy: Podstawy Scruma</p>
    <button @click="goToTop">Do góry</button>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
