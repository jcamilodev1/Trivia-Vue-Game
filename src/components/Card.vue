<template>
  <div class="container-card">
    <div class="card">
      <h2>{{ pregunta.question }}</h2>
      <h4>{{ pregunta.category }}</h4>
      <input type="radio" name="curso" value="correcto" v-model="picked" />
      {{ pregunta.correct_answer }}
      <div>
        <label>
          <input
            type="radio"
            name="curso"
            value="incorrecto"
            v-model="picked"
          />
          {{ pregunta.incorrect_answers[0] }}
        </label>
        <label>
          <input
            type="radio"
            name="curso"
            value="incorrecto"
            v-model="picked"
            checked
          />
          {{ pregunta.incorrect_answers[1] }}
        </label>
        <label>
          <input
            type="radio"
            name="curso"
            value="incorrecto"
            v-model="picked"
          />
          {{ pregunta.incorrect_answers[2] }}
        </label>
      </div>
      <span v-if="picked == 'incorrecto'">Pregunta incorrecta</span>
      <button @click="validar">Siguiente</button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import router from "@/router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  props: ["pregunta"],
  setup() {
    const picked = ref("");
    const contador = ref(0);
    const store = useStore();
    const preguntas = store.state.preguntas;
    const validar = () => {
      if (contador.value === 9) {
        router.push("/");
      } else if (picked.value == "correcto") {
        console.log("siguiente!!");
        contador.value++;
      }
    };
    const pregunta = computed(() => {
      return preguntas[contador.value];
    });

    return {
      preguntas,
      contador,
      pregunta,
      picked,
      validar,
    };
  },
};
</script>

<style></style>
