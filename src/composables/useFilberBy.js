/**
  Filtra un arreglo de películas con los filtros especificados.
  @param {Array} movies - Un arreglo de objetos que representan películas.
  @param {Object} filters - Un objeto que contiene los filtros a aplicar en las películas.
  @param {string} filters.titulo - El título que debe tener la película.
  @param {string} filters.genero - El género que debe tener la película.
  @param {number} filters.año - El año en el que se lanzó la película.
  @returns {Array} - Un arreglo de películas que coinciden con los filtros especificados.

  El mismo puede ser re utilizado con otros atributos para filtro cruzado
*/
export default function filterBy(movies, filters) {
  return movies.filter((mov) => {
    return Object.keys(filters).every((key) => {
      if (filters[key]) {
        if (key === "titulo") {
          if (filters[key].length > 0) {
            return mov.titulo
              .toUpperCase()
              .includes(filters[key].toUpperCase());
          } else {
            return mov;
          }
        } else if (key === "min") {
          return mov.recaudacion >= filters[key];
        } else if (key === "max") {
          return mov.recaudacion <= filters[key];
        } else {
          return mov[key] === filters[key];
        }
      } else {
        return true;
      }
    });
  });
}
