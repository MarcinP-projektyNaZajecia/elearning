<template>
  <div class="quiz">
    <QuizComponent />
  </div>
</template>

<script>
import QuizComponent from '../components/QuizComponent.vue'

export default {
  name: 'QuizView',
  components: {
    QuizComponent
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
