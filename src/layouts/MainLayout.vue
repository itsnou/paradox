<script setup>
import { ref, computed } from "vue";
import { useMoviesStore } from "../stores/movies";

import SearchByGenre from "../components/filters/Search-select.vue";
import SearchByYear from "../components/filters/Search-select.vue";
import SearchByDirector from "../components/filters/Search-select.vue";
import SearchRange from "../components/filters/Search-range.vue";

const store = useMoviesStore();
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const genres = computed(() => store.getGenre);
const years = computed(() => store.getYears);
const directors = computed(() => store.getDirectors);
const minRange = computed(() => store.getRangeMin);
const maxRange = computed(() => store.getRangeMax);

const changeGenre = (genre) => {
  store.doGetByGenre(genre);
};

const changeYear = (year) => {
  store.doGetByYear(year);
};
const changeDirector = (director) => {
  store.doGetByDirector(director);
};
const changeRange = (range) => {
  store.doGetByRange(range);
};
const resetChange = () => {
  store.resetAll();
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Paradox </q-toolbar-title>

        <div>Challange</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          <h6 class="q-px-none q-py-none q-mx-none q-my-none">Filtros</h6>
        </q-item-label>
        <SearchByGenre
          class="q-ml-lg q-mr-lg"
          @change-select="changeGenre"
          :options="genres"
          label="Generos"
        />
        <SearchByYear
          class="q-ml-lg q-mr-lg q-mt-lg"
          @change-select="changeYear"
          :options="years"
          label="Año de estreno"
        />
        <SearchByDirector
          class="q-ml-lg q-mr-lg q-mt-lg"
          @change-select="changeDirector"
          :options="directors"
          label="Directores"
        />
        <SearchRange
          class="q-ml-lg q-mr-lg q-mt-lg"
          @change-select="changeRange"
          @reset-range="resetChange"
          hint="Rango de recaudación"
          :minRange="minRange"
          :maxRange="maxRange"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
