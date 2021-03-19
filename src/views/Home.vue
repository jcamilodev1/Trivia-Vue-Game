<template>
  <div class="home">
    <h1>Hi welcome to Trivena</h1>
    <router-link to="/play">Let's Go</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    onMounted(async () => {
      await store.dispatch("getPreguntas");
    });
  },
};
</script>
