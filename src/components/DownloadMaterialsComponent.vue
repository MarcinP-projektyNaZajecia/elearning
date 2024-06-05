<template>
  <div class="download-links">
    <ul>
      <li class="link-class" v-for="link in links" :key="link.url">
        <a :href="link.url" target="_blank">{{ link.description }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DownloadMaterialsComponent',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped src="../assets/styles.css"></style>
