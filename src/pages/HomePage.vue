<template>
  <div class="movie">
    <h3 class="title">Welcome to Movie App</h3>
    <input
      class="search"
      type="text"
      name="q"
      placeholder="Search Movies"
      v-model="search"
    />
    <div v-if="isLoading">Loading</div>
    <div v-if="movies.length > 0" className="movie__row">
      <div class="movie__col" v-for="item in movies" v-bind:key="item.id">
        <Movie-item
        :id="item.id"
        :title="item.title"
        :isActive="selectedMovie === item.id"
        :subTitle="item.overview"
        v-on:handleActive="handleActive($event)"  
      />
      </div>
    </div>
    <div v-else-if="!isLoading">No Data Available</div>
  </div>
</template>

<script>
import MovieItem from '../components/MovieItem'
import debounce from 'debounce'
export default {
  name: 'HomePage',
  components: {
    MovieItem
  },
  beforeMount() {
    this.$store.dispatch('fetchMovie', 'a')
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    movies: function () {
      return this.$store.state.movies
    },
    selectedMovie: function () {
      return this.$store.state.selectedMovie
    },
    isLoading: function () {
      return this.$store.state.isLoading
    }
  },
  watch: {
    search: debounce(function (val) {
      this.$store.dispatch('fetchMovie', val)
    }, 500)
  },
  methods: {
    handleActive: function (id) {
      this.$store.dispatch('selectMovie', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  color: white;
  margin: 10px;
}

.search {
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: solid 1px grey;
  padding-left: 5px;
}

.movie {
  margin: auto;
  width: 50%;
}

.movie__row {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 50px;
}

.movie__row:before,
.movie__row:after {
  display: table;
  content: ' ';
}

.movie__row:after {
  clear: both;
}

.movie__col {
  width: 33.33333333%;
  float: left;
}
</style>
