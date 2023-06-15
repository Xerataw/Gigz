<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "BasicPage",
  components: { RouterView },
});
</script>

<template>
  <div class="h-screen relative">
    <RouterView />
  </div>
</template>
