<script setup>
const props = defineProps({
  movie: {
    type: Object,
  },
});
</script>

<template>
  <div>
    <h3>
      {{ props.movie.titulo }}
    </h3>
    <p>Año: {{ props.movie.año }}</p>
    <p>Genero: {{ props.movie.genero }}</p>
    <p>Director: {{ props.movie.director }}</p>
    <p>Recaudacion: {{ props.movie.recaudacion }}</p>
  </div>
</template>
