<script lang="ts">
import { defineComponent } from "vue";
import NavbarItem from "./NavbarItem.vue";
const icons = [
  {
    name: "search",
    icon: "",
    path: "/auth/search",
  },
  {
    name: "favorites",
    icon: "",
    path: "/auth/favorites",
  },
  {
    name: "messages",
    icon: "",
    path: "/auth/messages",
  },
  {
    name: "profile",
    icon: "",
    path: "/auth/profile",
  },
];
export default defineComponent({
  name: "BottomNavbar",
  data() {
    return { icons };
  },
  components: { NavbarItem },
});
</script>

<template>
  <div class="absolute bottom-0">
    <div class="flex">
      <NavbarItem v-for="icon in icons" :path="icon.path" :icon="icon.icon" />
    </div>
  </div>
</template>
