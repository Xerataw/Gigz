<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarItem",
  props: {
    path: { type: String, required: true },
    icon: { type: Object, required: true },
  },
});
</script>

<template>
  <RouterLink :to="path">
    <div class="h-20 w-20 bg-white text-red-500 fill-blue-500">
      <component :is="icon" />
    </div>
  </RouterLink>
</template>
