<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  minRange: Number,
  maxRange: Number,
  hint: String,
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
    <q-field filled :hint="props.hint" :dense="false">
      <template v-slot:control>
        <q-range
          v-model="range"
          :min="props.minRange"
          :max="props.maxRange"
          label-always
          markers
          :debaunce="400"
        />
      </template>
    </q-field>
  </div>
</template>
