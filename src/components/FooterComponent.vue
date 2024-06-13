<template>
  <footer class="footer">
    <p>{{ displayText.copyright }}</p>
    <button @click="goToTop">{{ displayText.goToTop }}</button>
  </footer>
</template>

<script>
import { EventBus } from '../event-bus.js';
import translate from '../translate.js';

export default {
  name: 'FooterComponent',
  data() {
    return {
      selectedLanguage: 'pl',
      defaultText: {
        copyright: '© 2024 Portal E-Learningowy: Podstawy Scruma',
        goToTop: 'Do góry',
      },
      displayText: {
        copyright: '© 2024 Portal E-Learningowy: Podstawy Scruma',
        goToTop: 'Do góry',
      },
    };
  },
  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async changeLanguage(selectedLanguage) {
      if (selectedLanguage === 'pl') {
        this.displayText = { ...this.defaultText };
      } else {
        this.displayText = await translate(this.defaultText, selectedLanguage);
      }
    },
  },
  created() {
    EventBus.on('language-changed', this.changeLanguage);
  },
  beforeUnmount() {
    EventBus.off('language-changed', this.changeLanguage);
  },
};
</script>

<style scoped src="../assets/styles.css"></style>
