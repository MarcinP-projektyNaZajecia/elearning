<template>
  <div class="subsection">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'Subsection',
  props: {
    title: String,
    content: String
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
