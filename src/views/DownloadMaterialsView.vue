<template>
    <div class="download-materials">
      <div v-html="content"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'DownloadMaterials',
    data() {
      return {
        content: ''
      }
    },
    async created() {
      const response = await axios.get('/path/to/your/downloadMaterials.json')
      this.content = response.data.content
    }
  }
  </script>
  
  <style scoped src="../assets/styles.css"></style>
  