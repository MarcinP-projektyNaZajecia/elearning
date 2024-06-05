<template>
  <div class="download-materials">
    <h2 class="download-tittle">Ciekawe materiały, linki i pliki o Scrumie:</h2>
    <DownloadMaterialsComponent :links="links" />
  </div>
</template>

<script>
import axios from 'axios';
import DownloadMaterialsComponent from '../components/DownloadMaterialsComponent.vue';

export default {
  name: 'DownloadMaterialsView',
  components: {
    DownloadMaterialsComponent,
  },
  data() {
    return {
      links: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('/links.json');
      this.links = response.data.links;
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  },
};
</script>

<style scoped src="../assets/styles.css"></style>
