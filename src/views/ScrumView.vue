<template>
  <div class="scrum">
    <CourseItem v-for="(item, index) in courseItems" :key="index" :item="item" class="content-item" />
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
      courseItems: []
    }
  },
  async created() {
    const response = await axios.get('/scrum.json')
    this.courseItems = response.data.items
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
