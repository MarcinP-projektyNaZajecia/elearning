import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'
import store from './store/state'
import axios from 'axios'; // NOWE: Importuj axios

const app = createApp(App)

app.config.productionTip = false

// NOWE: Dodaj funkcję $translate do prototypu Vue.js
app.config.globalProperties.$translate = async function(text, lang) {
  try {
    const response = await axios.get('http://localhost:3000/translate', {
      params: { text, lang }
    });
    return response.data.translatedText;
  } catch (error) {
    console.error(error);
  }
};

app.use(store).use(router).mount('#app')