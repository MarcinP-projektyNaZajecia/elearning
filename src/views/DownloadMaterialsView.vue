<template>
  <div class="download-materials">
    <h2 class="download-title">{{ downloadMaterialsTitle }}</h2>
    <DownloadMaterialsComponent :links="translatedLinks" />
  </div>
</template>

<script>
import axios from 'axios';
import DownloadMaterialsComponent from '../components/DownloadMaterialsComponent.vue';
import translate from '../translate.js';
import { ref, onMounted, watch } from 'vue';
import { EventBus } from '../event-bus.js';

export default {
  components: {
    DownloadMaterialsComponent,
  },
  setup() {
    const links = ref([]);
    const translatedLinks = ref([]);
    const downloadMaterialsTitle = ref('Linki i materiały do pobrania');

    const fetchLinks = async () => {
      const response = await axios.get('/links.json');
      links.value = response.data.links;
    };

    const translateLinks = async (lang) => {
      translatedLinks.value = await Promise.all(
        links.value.map(async (link) => {
          const translatedDescription = await translate({ description: link.description }, lang);
          return { ...link, description: translatedDescription.description };
        })
      );
    };

    const translateTitle = async (lang) => {
      const translatedTitle = await translate({ title: 'Linki i materiały do pobrania' }, lang);
      downloadMaterialsTitle.value = translatedTitle.title;
    };

    onMounted(async () => {
      await fetchLinks();
      EventBus.on('language-changed', translateLinks);
      EventBus.on('language-changed', translateTitle);
      await translateLinks('pl');
      await translateTitle('pl');
    });

    watch(EventBus, async (newLang) => {
      await translateLinks(newLang);
      await translateTitle(newLang);
    });

    return {
      translatedLinks,
      downloadMaterialsTitle,
    };
  },
};
</script>

<style scoped src="../assets/styles.css"></style>
