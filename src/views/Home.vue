<template>
    <div class="home">
      <div v-html="content"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Home',
    data() {
      return {
        content: ''
      }
    },
    async created() {
      const response = await axios.get('/path/to/your/home.json')
      this.content = response.data.content
    }
  }
  </script>
  
  <style scoped src="../assets/styles.css"></style>
  