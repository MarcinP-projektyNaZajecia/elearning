<template>
  <div class="quiz">
    <div v-for="(question, index) in quizData" :key="index">
      <h2>{{ question.question }}</h2>
      <div v-for="(answer, index) in question.answers" :key="index">
        <input type="radio" :value="answer" v-model="userAnswers[index]">{{ answer }}
      </div>
    </div>
    <button @click="submitQuiz">Submit Quiz</button>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  data() {
    return {
      quizData: [], // tutaj dodaj swoje dane dla Quiz
      userAnswers: []
    }
  },
  methods: {
    submitQuiz() {
      // tutaj dodaj swoją logikę dla przycisku Submit
    }
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
