<script setup>
import { ref, watch } from "vue";

const text = ref("");
const props = defineProps({
  placeHolder: String,
  hint: String,
});
const emit = defineEmits(["on-input-change", "restore"]);

watch(text, (newText) => {
  emit("on-input-change", newText.toUpperCase());
});
</script>

<template>
  <div class="buscador">
    <q-input
      v-model="text"
      debounce="300"
      filled
      :placeholder="props.placeHolder"
      :hint="props.hint"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>
