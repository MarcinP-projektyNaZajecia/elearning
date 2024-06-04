import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'
import store from './store/state'

const app = createApp(App)

app.config.productionTip = false

app.use(store).use(router).mount('#app')
