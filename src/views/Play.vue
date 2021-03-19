<template>
  <Card></Card>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import Card from "@/components/Card";
export default {
  components: {
    Card,
  },
  setup() {
    const store = useStore();
    const preguntas = store.state.preguntas;

    return {
      preguntas,
    };
  },
};
</script>

<style></style>
