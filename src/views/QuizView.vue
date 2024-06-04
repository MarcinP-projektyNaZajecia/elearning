<template>
    <div class="quiz">
      <Quiz /> <!-- Tutaj dodaj swoją logikę dla Quiz -->
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import Quiz from '../components/QuizComponent.vue'
  
  export default {
    name: 'QuizView',
    components: {
      Quiz
    },
    data() {
      return {
        quizData: []
      }
    },
    async created() {
      const response = await axios.get('/path/to/your/quiz.json')
      this.quizData = response.data.quiz
    }
  }
  </script>
  
  <style scoped src="../assets/styles.css"></style>
  