<script setup>
import { computed } from "vue";
import { useMoviesStore } from "../stores/movies";
import SearchInput from "../components/filters/Search-input.vue";
import Card from "../components/UI/Card.vue";

const store = useMoviesStore();
const movies = computed(() => store.getMovies);

const onInputChange = (payload) => {
  store.doGetByTitle(payload);
};

const onGetAll = () => {
  store.doGetAll();
};
</script>

<template>
  <section class="q-mx-lg q-my-lg search">
    <SearchInput
      @on-input-change="onInputChange"
      @restore="onGetAll"
      placeHolder="Buscar pelicula"
      hint=""
    />
  </section>
  <section v-if="movies.length > 0" class="cards">
    <div class="card" v-for="(movie, index) of movies" :key="index">
      <Card :movie="movie" />
    </div>
  </section>
  <section v-else>
    <h3>No se encontraron coincidencias</h3>
  </section>
</template>

<style lang="scss" scoped>
.search {
  .buscador {
    width: 100%;
  }
}
.cards {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
}

@media (min-width: 720px) {
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }
}
@media (min-width: 1024px) {
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
  }
}
.card {
  background: rgb(209, 172, 103) !important;
  color: black;
  border-radius: 20px;
  text-align: center;
}
</style>
