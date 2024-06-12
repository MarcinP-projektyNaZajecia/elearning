<template>
  <div class="quiz-element" v-if="quizData.length > 0">
    <div v-if="showWelcomeScreen">
      <p>Czeka Cię teraz kolejno 10 wybranych losowo pytań z puli 30. Do każdego pytania dostaniesz 3 pododpowiedzi, z których tylko jedna jest poprawna. Powodzenia</p>
      <button @click="startQuiz">Rozpocznij quiz</button>
    </div>
    <div v-else-if="!quizSubmitted">
      <h2>{{ quizData[currentQuestionIndex].statement }}</h2>
      <div v-for="(answer, index) in shuffledAnswers" :key="index">
        <input type="radio" :value="answer" v-model="userAnswers[currentQuestionIndex]">{{ answer }}
      </div>
      <button @click="nextQuestion">
        {{ currentQuestionIndex < quizData.length - 1 ? 'Zatwierdź i przejdź do następnego pytania' : 'Zatwierdź i przejdź do wyników' }}
      </button>
    </div>
    <div v-else>
      <h2>Twój wynik: {{ score }}/{{ quizData.length }}</h2>
      <ul>
        <li v-for="(result, index) in results" :key="index" :style="{ color: result.correct ? 'green' : 'red' }">
          {{ result.question }} - Twoja odpowiedź: {{ result.userAnswer }}
        </li>
      </ul>
      <button @click="resetQuiz">Wróć do quizu</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'QuizComponent',
  data() {
    return {
      quizData: [],
      userAnswers: [],
      currentQuestionIndex: 0,
      shuffledAnswers: [],
      quizSubmitted: false,
      score: 0,
      showWelcomeScreen: true,
      results: []
    }
  },
  methods: {
    async getQuizData() {
      const response = await axios.get('http://144.24.184.143:3000/api/quiz')
      this.quizData = response.data
      this.userAnswers = new Array(this.quizData.length).fill(null)
      this.shuffleAnswers()
    },
    shuffleAnswers() {
      const answers = Object.values(this.quizData[this.currentQuestionIndex].answer)
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      this.shuffledAnswers = answers
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.quizData.length - 1) {
        this.currentQuestionIndex++
        this.shuffleAnswers()
      } else {
        this.submitQuiz()
      }
    },
    async submitQuiz() {
      const response = await axios.post('http://144.24.184.143:3000/api/submitQuiz', {
        answers: this.userAnswers.map((answer, index) => ({
          questionId: this.quizData[index].id,
          answer: answer
        }))
      })
      this.score = response.data.score
      this.results = response.data.questionsAndAnswers
      this.quizSubmitted = true
    },
    startQuiz() {
      this.showWelcomeScreen = false
      this.getQuizData()
    },
    resetQuiz() {
      this.quizData = []
      this.userAnswers = []
      this.currentQuestionIndex = 0
      this.shuffledAnswers = []
      this.quizSubmitted = false
      this.score = 0
      this.showWelcomeScreen = true
      this.results = []
      this.getQuizData()
    }
  },
  mounted() {
    this.getQuizData()
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
