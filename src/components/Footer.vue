<template>
  <footer>
    <div class="text-center py-6 text-gray-400">
      <div>© {{ CURRENT_YEAR }} Envíos Fast Track</div>
      <small>
        Desarrollado por
        <a href="https://strain-team.com" class="text-[#8f00ff]" target="_blank">
          StrainTeam Developers
        </a>
      </small>
    </div>
  </footer>
</template>

<script setup>
const CURRENT_YEAR = new Date().getFullYear()
</script>
