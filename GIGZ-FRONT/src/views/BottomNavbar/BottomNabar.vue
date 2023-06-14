<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BottomNavbar",
});
</script>

<template>
  <RouterView />
  <div>THIS IS A NAV BAR</div>
  <RouterLink to="/auth/favorites">THIS IS A LINK TO FAV</RouterLink>
</template>
