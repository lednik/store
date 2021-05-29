<template>
  <div class="track">
    <div class="track__button">
      <svg class="track__play track__icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 28V0L28 13.7021L0 28Z" fill="white"/>
      </svg>
    </div>
    <div class="track__info">
      <div class="track__name">
        <template v-if="name && name != ''">
          {{ name }}
        </template>
        <template v-else>
          bubuka music
        </template>
      </div>
      <div class="track__author">
        <template v-if="author && author != ''">
          {{ author }}
        </template>
        <template v-else>
          Bubuka music
        </template>
      </div>
    </div>
    <div class="track__time">
      {{ time }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'gradient-bg-button',
  props: ['id', 'name', 'author', 'time'],
  data () {
    return {
    }
  }
}
</script>

<style lang="sass">
@import '~@styles/components/track.sass'
</style>
