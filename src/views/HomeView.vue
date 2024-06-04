<template>
  <div class="home">
    <div v-for="item in content" :key="item.title" class="content-item">
      <h3>{{ item.title }}</h3>
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomeView',
  data() {
    return {
      content: []
    }
  },
  async created() {
    const response = await axios.get('/home.json')
    this.content = response.data.items
  }
}
</script>

<style scoped src="../assets/styles.css"></style>
