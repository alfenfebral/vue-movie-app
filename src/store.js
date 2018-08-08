import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const API_KEY = ''

const FETCH_MOVIE = 'FETCH_MOVIE'
const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS'
const FETCH_MOVIE_FAILED = 'FETCH_MOVIE_FAILED'
const SELECT_MOVIE = 'SELECT_MOVIE'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    selectedMovie: 0,
    isLoading: false,
    error: {}
  },
  mutations: {
    [SELECT_MOVIE]: (state, payload) => {
      state.selectedMovie = payload
    },
    [FETCH_MOVIE]: state => {
      state.isLoading = true;
    },
    [FETCH_MOVIE_SUCCESS]: (state, payload) => {
      state.movies = payload.results
      state.isLoading = false;
    },
    [FETCH_MOVIE_FAILED]: (state, payload) => {
      state.error = payload
      state.isLoading = false;
    },
  },
  actions: {
    fetchMovie: (context, payload) => {
      context.commit('FETCH_MOVIE')
      if(payload === '')
        payload = 'a'
      
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${payload}`).then(res => {
        context.commit('FETCH_MOVIE_SUCCESS', res.data)
      }).catch(err => {
        context.commit('FETCH_MOVIE_FAILED', err)
      })
    },
    selectMovie: (context, payload) => {
      context.commit(SELECT_MOVIE, payload)
    }
  }
})
