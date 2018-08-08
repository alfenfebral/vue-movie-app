<template>
  <button
    type="button"
    :class="['movie__item', { 'movie__item--state-active': isActive }]"
    @click="handleActive()"
  >
    <h4 class="movie__item__heading">{{ title }}</h4>
    <p class="movie__item__subtitle">{{ subTitle }}</p>
  </button>
</template>

<script>
export default {
  name: 'MovieItem',
  props: {
    'id': Number,
    'isActive': Boolean,
    'title': String,
    'subTitle': String
  },
  methods: {
    handleActive: function () {
      this.$emit('handleActive', this.id)
    }
  }
}
</script>

<style scoped>
.movie__item {
  height: 250px;
  margin: 20px 10px 0px 10px;
}

.movie__item--state-active {
  background: aquamarine;
}
.movie__item__heading {
  font-size: 18px;
}
.movie__item__subtitle {
  font-size: 12px;
}
</style>
