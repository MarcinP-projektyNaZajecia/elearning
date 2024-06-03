<template>
    <div class="scrum">
      <CourseItem v-for="(item, index) in courseItems" :key="index" :title="item.title" :description="item.description" :link="item.link" />
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import CourseItem from '../components/CourseItem.vue'
  
  export default {
    name: 'Scrum',
    components: {
      CourseItem
    },
    data() {
      return {
        courseItems: []
      }
    },
    async created() {
      const response = await axios.get('/path/to/your/scrum.json')
      this.courseItems = response.data.items
    }
  }
  </script>
  
  <style scoped src="../assets/styles.css"></style>
  