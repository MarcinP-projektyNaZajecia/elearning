<template>
  <nav class="navbar">
    <router-link class="nav-link" active-class="active-link" to="/">{{ displayText.home }}</router-link>
    <router-link class="nav-link" active-class="active-link" to="/scrum">{{ displayText.scrum }}</router-link>
    <router-link class="nav-link" active-class="active-link" to="/quiz">{{ displayText.quiz }}</router-link>
    <router-link class="nav-link" active-class="active-link" to="/download-materials">{{ displayText.downloadMaterials }}</router-link>
    <select v-model="selectedLanguage" @change="changeLanguage">
      <option value="pl">Polski</option>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
    </select>
  </nav>
</template>

<script>
import translate from '../translate.js'; // Importuj funkcję translate

export default {
  name: 'NavbarComponent',
  data() {
    return {
      selectedLanguage: 'pl', // domyślny język
      defaultText: { // Oryginalny tekst w języku polskim
        home: 'Strona główna',
        scrum: 'Scrum',
        quiz: 'Quiz',
        downloadMaterials: 'Linki i materiały do pobrania',
      },
      displayText: { // Tekst do wyświetlenia
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
        // Jeśli język jest ustawiony na polski, przywróć oryginalny tekst
        this.displayText = {...this.defaultText};
      } else {
        // W przeciwnym razie przetłumacz tekst na wybrany język
        this.displayText = await translate(this.defaultText, this.selectedLanguage);
      }
    },
  },
};
</script>