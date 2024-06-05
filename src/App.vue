<template>
  <div id="app">
    <NavbarComponent />
    <div class="content">
      <router-view />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>

<style src="./assets/styles.css"></style>
