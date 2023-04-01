<script setup>
import { ref, watch } from "vue";

const selected = ref("");
const props = defineProps({
  options: Array,
  label: String,
});
const emits = defineEmits(["change-select"]);
watch(selected, (newSelected) => {
  emits("change-select", newSelected);
});
</script>

<template>
  <div>
    <q-select
      filled
      v-model="selected"
      :options="options"
      clearable
      :label="label"
    />
  </div>
</template>
