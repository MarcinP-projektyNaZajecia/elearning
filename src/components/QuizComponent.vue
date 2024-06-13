<template>
  <div class="quiz-element" v-if="quizData && quizData.length > 0 && userAnswers && userAnswers.length > 0 &&!loading">
    <div v-if="showWelcomeScreen">
      <p>{{ welcomeMessage }}</p>
      <button @click="startQuiz">{{ startQuizButton }}</button>
    </div>
    <div v-else-if="!quizSubmitted && currentQuizData[currentQuestionIndex]">
      <h2>{{ currentQuizData[currentQuestionIndex].statement }}</h2>
      <div v-for="(answer, index) in shuffledAnswers" :key="index">
        <input type="radio" :value="answer" v-model="userAnswers[currentQuestionIndex]">{{ answer }}
      </div>
      <button @click="nextQuestion">
        {{ currentQuestionIndex < quizData.length - 1? nextQuestionButton : submitQuizButton }}
      </button>
    </div>
    <div v-else>
      <h2>{{ scoreMessage }}: {{ score }}/{{ quizData.length }}</h2>
      <ul>
        <li v-for="(result, index) in results" :key="index" :style="{ color: result.correct? 'green' : 'ed' }">
          {{ result.question }} - {{ yourAnswerMessage }}: {{ result.userAnswer }}
        </li>
      </ul>
      <button @click="resetQuiz">{{ resetQuizButton }}</button>
    </div>
  </div>
  <div v-else-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios'
import translate from '../translate.js'
import { EventBus } from '../event-bus.js'

export default {
  name: 'QuizComponent',
  data() {
    return {
      originalQuizData: [],
      translatedQuizData: [],
      quizData: [],
      userAnswers: [],
      currentQuestionIndex: 0,
      shuffledAnswers: [],
      quizSubmitted: false,
      score: 0,
      showWelcomeScreen: true,
      results: [],
      lang: 'pl',
      pl: {
        welcomeMessage: 'Czeka Cię teraz kolejno 10 wybranych losowo pytań z puli 30. Do każdego pytania dostaniesz 3 pododpowiedzi, z których tylko jedna jest poprawna. Powodzenia',
        startQuizButton: 'Rozpocznij quiz',
        nextQuestionButton: 'Zatwierdź i przejdź do następnego pytania',
        submitQuizButton: 'Zatwierdź i przejdź do wyników',
        scoreMessage: 'Twój wynik',
        yourAnswerMessage: 'Twoja odpowiedź',
        resetQuizButton: 'Wróć do quizu'
      },
      translated: {
        welcomeMessage: 'Czeka Cię teraz kolejno 10 wybranych losowo pytań z puli 30. Do każdego pytania dostaniesz 3 pododpowiedzi, z których tylko jedna jest poprawna. Powodzenia',
        startQuizButton: 'Rozpocznij quiz',
        nextQuestionButton: 'Zatwierdź i przejdź do następnego pytania',
        submitQuizButton: 'Zatwierdź i przejdź do wyników',
        scoreMessage: 'Twój wynik',
        yourAnswerMessage: 'Twoja odpowiedź',
        resetQuizButton: 'Wróć do quizu'
      },
      loading: false
    }
  },
  computed: {
    currentQuizData() {
      return this.lang === 'pl'? this.originalQuizData : this.translatedQuizData;
    },
    welcomeMessage() {
      return this.lang === 'pl'? this.pl.welcomeMessage : this.translated.welcomeMessage;
    },
    startQuizButton() {
      return this.lang === 'pl'? this.pl.startQuizButton : this.translated.startQuizButton;
    },
    nextQuestionButton() {
      return this.lang === 'pl'? this.pl.nextQuestionButton : this.translated.nextQuestionButton;
    },
    submitQuizButton() {
      return this.lang === 'pl'? this.pl.submitQuizButton : this.translated.submitQuizButton;
    },
    scoreMessage() {
      return this.lang === 'pl'? this.pl.scoreMessage : this.translated.scoreMessage;
    },
    yourAnswerMessage() {
      return this.lang === 'pl'? this.pl.yourAnswerMessage : this.translated.yourAnswerMessage;
    },
    resetQuizButton() {
      return this.lang === 'pl'? this.pl.resetQuizButton : this.translated.resetQuizButton;
    }
  },
methods: {
    async getQuizData() {
      const { data } = await axios.get('http://localhost:3000/api/quiz')
      this.originalQuizData = data
      this.userAnswers = new Array(this.originalQuizData.length).fill(null)
      this.quizData = [...this.originalQuizData]; // deep copy
      this.translateContent(this.lang)
      EventBus.on('language-changed', this.translateContent)
    },
    shuffleAnswers() {
      const answers = Object.values(this.currentQuizData[this.currentQuestionIndex].answer)
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      this.shuffledAnswers = answers
    },
    resetAnswers() {
      this.shuffledAnswers = [];
      this.userAnswers = new Array(this.quizData.length).fill(null);
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
      const { data } = await axios.post('http://localhost:3000/api/submitQuiz', {
        answers: this.userAnswers.map((answer, index) => ({
          questionId: this.quizData[index].id,
          answer: answer
        }))
      })
      this.score = data.score
      this.results = data.questionsAndAnswers
      this.quizSubmitted = true
    },
    async startQuiz() {
      this.showWelcomeScreen = false
      await this.getQuizData()
      this.shuffleAnswers()
    },
    resetQuiz() {
      this.quizData = [...this.originalQuizData]; // restore original data
      this.translatedQuizData = []; // reset translated data
      this.userAnswers = [];
      this.currentQuestionIndex = 0;
      this.shuffledAnswers = [];
      this.quizSubmitted = false;
      this.score = 0;
      this.showWelcomeScreen = true;
      this.results = [];
      this.getQuizData()
    },
    async translateContent(lang) {
      this.loading = true;
      this.lang = lang
      if (lang!== 'pl') {
        this.translatedQuizData = await Promise.all(this.originalQuizData.map(async item => {
          const statement = await translate({ [item.statement]: item.statement }, lang)
          const answer = await Promise.all(Object.entries(item.answer).map(async ([key, value]) => {
            const translatedValue = await translate({ [value]: value }, lang)
            return [key, translatedValue[value]]
          }))
          return { id: item.id, statement: statement[item.statement], answer: Object.fromEntries(answer) }
        }))
        this.$nextTick(async () => {
          this.quizData = this.translatedQuizData
          this.currentQuizData = this.quizData
          this.resetAnswers()
          this.shuffleAnswers()
          const translatedTexts = await translate(this.pl, lang)
          for (const key in translatedTexts) {
            this.translated[key] = translatedTexts[key]
          }
          this.loading = false
        })
      } else {
        this.$nextTick(() => {
          this.quizData = this.originalQuizData
          this.currentQuizData = this.quizData
          this.resetAnswers()
          this.shuffleAnswers()
          this.loading = false
        })
      }
    }
  },
  created() {
    this.getQuizData()
  }
}
</script>

<style scoped src="../assets/styles.css"></style>