<template>
  <nav class="navbar">
    <router-link class="nav-link" active-class="active-link" to="/">{{ displayText.home }}</router-link>
    <router-link class="nav-link" active-class="active-link" to="/scrum">{{ displayText.scrum }}</router-link>
    <router-link class="nav-link" active-class="active-link" to="/quiz">{{ displayText.quiz }}</router-link>
    <router-link class="nav-link" active-class="active-link" to="/download-materials">{{ displayText.downloadMaterials }}</router-link>
    <select v-model="selectedLanguage" @change="changeLanguage" class="language-selector">
      <option value="pl">Polski</option>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
    </select>
  </nav>
</template>

<script>
import { EventBus } from '../event-bus.js';
import translate from '../translate.js';

export default {
  name: 'NavbarComponent',
  data() {
    return {
      selectedLanguage: 'pl',
      defaultText: {
        home: 'Strona główna',
        scrum: 'Scrum',
        quiz: 'Quiz',
        downloadMaterials: 'Linki i materiały do pobrania',
      },
      displayText: {
        home: 'Strona główna',
        scrum: 'Scrum',
        quiz: 'Quiz',
        downloadMaterials: 'Linki i materiały do pobrania',
      },
    };
  },
  methods: {
    async changeLanguage() {
      if (this.selectedLanguage === 'pl') {
        this.displayText = { ...this.defaultText };
      } else {
        this.displayText = await translate(this.defaultText, this.selectedLanguage);
      }
      EventBus.emit('language-changed', this.selectedLanguage);
    },
  },
};
</script>

<style scoped src="../assets/styles.css"></style>