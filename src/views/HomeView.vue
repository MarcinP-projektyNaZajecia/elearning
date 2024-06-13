<template>
  <div class="home">
    <div v-for="item in displayedContent" :key="item.title" class="content-item">
      <h3>{{ item.title }}</h3>
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import translate from '../translate.js'
import { EventBus } from '../event-bus.js'

export default {
  name: 'HomeView',
  data() {
    return {
      originalContent: [],
      translatedContent: [],
      displayedContent: []
    }
  },
  async created() {
    const response = await axios.get('/home.json')
    this.originalContent = response.data.items
    this.displayedContent = this.originalContent
    EventBus.on('language-changed', this.translateContent)
  },
  beforeUnmount() {
    EventBus.off('language-changed', this.translateContent)
  },
  methods: {
    async translateContent(lang) {
      if (lang === 'pl') {
        this.displayedContent = this.originalContent
      } else {
        this.translatedContent = await Promise.all(this.originalContent.map(async item => {
          const title = await translate({ [item.title]: item.title }, lang)
          const content = await translate({ [item.content]: item.content }, lang)
          return { title: title[item.title], content: content[item.content] }
        }))
        this.displayedContent = this.translatedContent
      }
    }
  }
}
</script>

<style scoped src="../assets/styles.css"></style>