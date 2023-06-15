<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarItem",
  props: {
    path: { type: String, required: true },
    icon: { type: String, required: true },
  },
});
</script>

<template>
  <div class="h-24">
    <RouterLink :to="path">
      <img src="https://picsum.photos/200/300" alt="navbar item picture" />
    </RouterLink>
  </div>
</template>
