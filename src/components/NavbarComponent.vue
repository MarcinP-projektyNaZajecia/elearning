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
      englishText: { // Tekst w języku angielskim
        home: 'Home',
        scrum: 'Scrum',
        quiz: 'Quiz',
        downloadMaterials: 'Download links and materials',
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
      } else if (this.selectedLanguage === 'en') {
        // Jeśli język jest ustawiony na angielski, użyj tekstu angielskiego
        this.displayText = {...this.englishText};
      } else {
        // W przeciwnym razie przetłumacz tekst na wybrany język
        for (let key in this.englishText) {
          const response = await fetch(`http://localhost:3000/translate?text=${encodeURIComponent(this.englishText[key])}&lang=${this.selectedLanguage}`);
          const result = await response.json();
          this.displayText[key] = result.translatedText;
        }
      }
    },
  },
};
</script>
