<template>
  <div class="home">
    <h1>Hi welcome to Trivena</h1>
    <router-link to="/play" class="button-init">Let's Go</router-link>
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

<style scoped>
.home {
  max-width: 650px;
}
h1 {
  margin-bottom: 80px;
}
.button-init {
  background-color: #42b983;
  padding: 20px;
  border-radius: 10px;
}
a {
  color: white;
  text-decoration: none;
}
</style>
