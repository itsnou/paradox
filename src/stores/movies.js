import { defineStore } from "pinia";
import peliculas from "../utils/Peliculas.json";
import useFilterBy from "../composables/useFilberBy.js";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: JSON.parse(JSON.stringify(peliculas)),
    genres: [...new Set(peliculas.map((mov) => mov.genero))],
    years: [...new Set(peliculas.map((mov) => mov.año))],
    directors: [...new Set(peliculas.map((mov) => mov.director))],
    arrayCollection: peliculas.map((el) => el.recaudacion),
    rangeMin: peliculas
      .map((el) => el.recaudacion)
      .reduce((x, y) => Math.min(x, y)),
    rangeMax: peliculas
      .map((el) => el.recaudacion)
      .reduce((x, y) => Math.max(x, y)),
    titulo: "",
    genreSelected: "",
    year: "",
    director: "",
    min: 0,
    max: 0,
  }),
  getters: {
    getMovies: (state) => state.movies,
    getGenre: (state) => state.genres,
    getYears: (state) => state.years,
    getDirectors: (state) => state.directors,
    getArrayCollection: (state) => state.arrayCollection,
    getRangeMin: (state) => state.rangeMin,
    getRangeMax: (state) => state.rangeMax,
  },
  actions: {
    doGetAll() {
      this.movies = JSON.parse(JSON.stringify(peliculas));
    },
    doGetByTitle(payload) {
      this.titulo = payload;
      this.modifieMovies();
    },
    doGetByGenre(payload) {
      this.genreSelected = payload;
      this.modifieMovies();
    },
    doGetByYear(payload) {
      this.year = payload;
      this.modifieMovies();
    },
    doGetByDirector(payload) {
      this.director = payload;
      this.modifieMovies();
    },
    doGetByRange(payload) {
      this.min = payload.min;
      this.max = payload.max;
      this.modifieMovies();
    },
    modifieMovies() {
      let movies = JSON.parse(JSON.stringify(peliculas)); // Referencia
      // if (this.genreSelected && this.titulo && this.year) {
      //   movies = movies.filter(
      //     (mov) =>
      //       mov.titulo.toUpperCase().includes(this.titulo) &&
      //       mov.genero === this.genreSelected &&
      //       mov.año === this.year
      //   );
      // } else {
      //   if (this.genreSelected) {
      //     movies = movies.filter((mov) => mov.genero === this.genreSelected);
      //   }
      //   if (this.titulo) {
      //     movies = movies.filter((mov) =>
      //       mov.titulo.toUpperCase().includes(this.titulo)
      //     );
      //   }
      //   if (this.year) {
      //     movies = movies.filter((mov) => mov.año === this.year);
      //   }
      //   this.resetAll();
      // }
      let filters = {};
      if (this.genreSelected) {
        filters.genero = this.genreSelected;
      }
      if (this.titulo) {
        filters.titulo = this.titulo;
      }
      if (this.year) {
        filters.año = this.year;
      }
      if (this.director) {
        filters.director = this.director;
      }
      if (this.min) {
        filters.min = this.min;
      }
      if (this.max) {
        filters.max = this.max;
      }

      if (Object.values(filters).some((filter) => filter)) {
        movies = useFilterBy(movies, filters);
      } else {
        this.resetAll();
      }

      this.movies = movies;
      this.genres = [...new Set(this.movies.map((mov) => mov.genero))];
      this.years = [...new Set(this.movies.map((mov) => mov.año))];
      this.directors = [...new Set(this.movies.map((mov) => mov.director))];
      if (
        Object.values(filters).some((filter) => filter) &&
        !this.min &&
        !this.max
      ) {
        this.rangeMin = this.movies
          .map((el) => el.recaudacion)
          .reduce((x, y) => Math.min(x, y));
        this.rangeMax = this.movies
          .map((el) => el.recaudacion)
          .reduce((x, y) => Math.max(x, y));
      }
    },
    resetAll() {
      if (!this.titulo) {
        this.genres = [...new Set(peliculas.map((mov) => mov.genero))];
        this.rangeMin = peliculas
          .map((el) => el.recaudacion)
          .reduce((x, y) => Math.min(x, y));
        this.rangeMax = peliculas
          .map((el) => el.recaudacion)
          .reduce((x, y) => Math.max(x, y));
      }
    },
  },
});
