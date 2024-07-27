<template>
  <footer>
    <div class="text-center py-6 text-gray-400">
      <div>© {{ CURRENT_YEAR }} Envíos de Occidente</div>
      <small>
        Desarrollado por
        <a href="https://www.linkedin.com/in/kenetpicado/" class="text-gulf-blue-950"> Kenet P. </a>
      </small>
    </div>
  </footer>
</template>

<script setup>
const CURRENT_YEAR = new Date().getFullYear()
</script>
