<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  minRange: Number,
  maxRange: Number,
});

const range = ref({
  min: JSON.parse(JSON.stringify(props.minRange)),
  max: JSON.parse(JSON.stringify(props.maxRange)),
});

const emits = defineEmits(["change-select", "reset-range"]);

watch(range, (newRange) => {
  emits("change-select", newRange);
});
</script>

<template>
  <div>
    <q-range
      v-model="range"
      :min="props.minRange"
      :max="props.maxRange"
      label-always
      markers
      :debaunce="400"
    />
  </div>
</template>
