<script lang="ts">
import { defineComponent } from "vue";
import HearthIcon from "../Icons/HearthIcon.vue";
import MessageIcon from "../Icons/MessageIcon.vue";
import ProfileIcon from "../Icons/ProfileIcon.vue";
import SearchIcon from "../Icons/SearchIcon.vue";
import NavbarItem from "./NavbarItem.vue";

interface Icon {
  name: string;
  path: string;
  icon: Object;
}

const icons: Icon[] = [
  {
    name: "search",
    icon: SearchIcon,
    path: "/auth/search",
  },
  {
    name: "favorites",
    icon: HearthIcon,
    path: "/auth/favorites",
  },
  {
    name: "messages",
    icon: MessageIcon,
    path: "/auth/messages",
  },
  {
    name: "profile",
    icon: ProfileIcon,
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
  <div class="absolute bottom-0 w-full">
    <div class="flex w-full justify-center">
      <NavbarItem v-for="icon in icons" :path="icon.path" :icon="icon.icon" />
    </div>
  </div>
</template>
