<template>
  <div class="container-card">
    <div class="card">
      {{ pregunta }}
      <h1>{{ enconde }}</h1>
      <label>
        <input
          type="radio"
          name="curso"
          :value="arrayAnswer[random[0]]"
          v-model="picked"
        />
        {{ arrayAnswer[random[0]] }}
      </label>
      <label>
        <input
          type="radio"
          name="curso"
          :value="arrayAnswer[random[1]]"
          v-model="picked"
        />
        {{ arrayAnswer[random[1]] }}
      </label>
      <label>
        <input
          type="radio"
          name="curso"
          :value="arrayAnswer[random[2]]"
          v-model="picked"
        />
        {{ arrayAnswer[random[2]] }}
      </label>
      <label>
        <input
          type="radio"
          name="curso"
          :value="arrayAnswer[random[3]]"
          v-model="picked"
        />
        {{ arrayAnswer[random[3]] }}
      </label>
      <br />
      {{ picked }}
    </div>
    <span v-if="picked == ''">Rellena una respuesta</span>
    <button @click="comprobar">+</button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import router from "@/router";
import { useStore } from "vuex";
import { computed, onUnmounted } from "@vue/runtime-core";
import RadioButton from "./RadioButton.vue";
export default {
  components: { RadioButton },
  setup() {
    const store = useStore();

    const picked = ref("");
    const contador = ref(0);

    const preguntas = store.state.preguntas;
    const pregunta = ref([]);
    const arrayAnswer = ref([]);
    const lista = ref([0, 1, 2, 3]);
    const random = ref([]);

    const generateRan = () => {
      lista.value = lista.value.sort(function() {
        return Math.random() - 0.5;
      });
      random.value = lista.value;
    };

    const crearArray = () => {
      pregunta.value = preguntas[contador.value];
      generateRan();
      arrayAnswer.value.push(pregunta.value.correct_answer);
      pregunta.value.incorrect_answers.forEach((element) => {
        arrayAnswer.value.push(element);
      });
      arrayAnswer.value = arrayAnswer.value.map((i) => {
        return unescape(i);
      });
      console.log(arrayAnswer, enconde);
    };

    const comprobar = () => {
      if (contador === 9) {
        router.push("/");
      } else if (picked.value === pregunta.value.correct_answer) {
        console.log("ganaste");
        siguiente();
        picked.value = "";
      }
    };

    const siguiente = () => {
      contador.value++;
      arrayAnswer.value = [];
      crearArray();
    };
    const enconde = computed(() => {
      return unescape(pregunta.value.question);
    });

    crearArray();
    return {
      picked,
      contador,
      pregunta,
      arrayAnswer,
      random,
      comprobar,
      enconde,
    };
  },
};
</script>

<style></style>
