<template>
  <div class="scrum">
    <nav class="scrum-menu">
      <a v-for="(item, index) in translatedCourseItems" 
         :key="index" 
         :href="'#' + item.title.replace(/ /g, '-')" 
         :class="['nav-link', { 'active-link': activeSection === index }]" 
         @click="activeSection = index">
        {{ item.title }}
      </a>
    </nav>
    <CourseItem v-if="translatedCourseItems.length > 0" :item="translatedCourseItems[activeSection]" class="content-item"/>
  </div>
</template>

<script>
import axios from 'axios'
import CourseItem from '../components/CourseItemComponent.vue'
import translate from '../translate.js'
import { EventBus } from '../event-bus.js'

export default {
  name: 'ScrumView',
  components: {
    CourseItem
  },
  data() {
    return {
      courseItems: [],
      translatedCourseItems: [],
      activeSection: 0
    }
  },
  async created() {
    const response = await axios.get('/scrum.json')
    this.courseItems = response.data.items
    this.translatedCourseItems = this.courseItems
    EventBus.on('language-changed', this.translateContent)
  },
  beforeUnmount() {
    EventBus.off('language-changed', this.translateContent)
  },
  methods: {
    async translateContent(lang) {
      if (lang === 'pl') {
        this.translatedCourseItems = this.courseItems
      } else {
        this.translatedCourseItems = await Promise.all(this.courseItems.map(async item => {
          const title = await translate({ [item.title]: item.title }, lang)
          const sections = await Promise.all(item.sections.map(async section => {
            const subtitle = await translate({ [section.subtitle]: section.subtitle }, lang)
            const content = await translate({ [section.content]: section.content }, lang)
            return { subtitle: subtitle[section.subtitle], content: content[section.content] }
          }))
          return { title: title[item.title], sections }
        }))
      }
    }
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
