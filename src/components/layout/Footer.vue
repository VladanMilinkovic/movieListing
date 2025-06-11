<template>
  <footer class="footer">
    <p class="footer-text">Copyright © {{ currentYear }} Vladan Milinkovic</p>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
