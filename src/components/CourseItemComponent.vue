<template>
  <div class="course-item">
    <h2>{{ item.title }}</h2>
    <div v-for="(section, index) in item.sections" :key="index" class="section-item">
      <h3>{{ section.subtitle }}</h3>
      <p>{{ section.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>
