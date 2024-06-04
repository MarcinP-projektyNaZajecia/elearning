<template>
  <div class="scrum">
    <nav class="scrum-menu">
      <a v-for="(item, index) in courseItems" 
         :key="index" 
         :href="'#' + item.title.replace(/ /g, '-')" 
         :class="['nav-link', { 'active-link': activeSection === index }]" 
         @click="activeSection = index">
        {{ item.title }}
      </a>
    </nav>
    <CourseItem v-if="courseItems.length > 0" :item="courseItems[activeSection]" class="content-item"/>
  </div>
</template>

<script>
import axios from 'axios'
import CourseItem from '../components/CourseItemComponent.vue'

export default {
  name: 'ScrumView',
  components: {
    CourseItem
  },
  data() {
    return {
      courseItems: [],
      activeSection: 0 // Dodajemy nową zmienną do śledzenia aktywnej sekcji
    }
  },
  async created() {
    const response = await axios.get('/scrum.json')
    this.courseItems = response.data.items
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
