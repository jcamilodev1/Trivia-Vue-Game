<template>
  <div class="container-card">
    <div class="card">
      <h1>{{ enconde }}</h1>
      <h5>{{ category }}</h5>
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
    </div>
    <span v-if="picked == ''" class="rellena">Select an answer</span>
    <span v-if="mostrar" class="rellena">Incorrect answer</span>

    <button @click="comprobar">Check</button>
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
    const mostrar = ref(false);
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
        mostrar.value = false;
        console.log("ganaste");
        siguiente();
        picked.value = "";
      } else {
        mostrar.value = true;
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
    const category = computed(() => {
      return unescape(pregunta.value.category);
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
      category,
      mostrar,
    };
  },
};
</script>

<style scoped>
.container-card {
  max-width: 600px;
  padding: 30px;
}
h1 {
  margin-bottom: 5px;
}
h5 {
  color: #2c3e509a;
  font-size: 10px;
  margin-bottom: 40px;
}
label {
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  text-align: initial;
  border-bottom: 1px solid rgba(0, 0, 0, 0.219);
}
label input {
  margin-right: 15px;
}
button {
  cursor: pointer;
  border: none;
  padding: 20px 40px;
  border-radius: 15px;
  color: white;
  background-color: #42b983;
}
.rellena {
  display: block;
  font-size: 12px;
  color: red;
  margin-bottom: 10px;
}
</style>
