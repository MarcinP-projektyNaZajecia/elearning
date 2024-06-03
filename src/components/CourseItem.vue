<template>
  <div class="course-item">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <router-link :to="link">Learn More</router-link>
  </div>
</template>

<script>
export default {
  name: 'CourseItem',
  props: {
    title: String,
    description: String,
    link: String
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
