<template>
  <div class="track" @click="$emit('click')">
    <div class="track__left">
      <div class="track__button">
        <svg v-if="playing" class="track__stop track__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="2" width="6" height="28" fill="white"/>
        <rect x="20" y="2" width="6" height="28" fill="white"/>
        </svg>
        <svg v-else class="track__play track__icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 28V0L28 13.7021L0 28Z" fill="white"/>
        </svg>
      </div>
      <div class="track__info">
        <div class="track__name">
          <template v-if="item.title && item.title != ''">
            {{ item.title }}
          </template>
          <template v-else>
            Unknown Name
          </template>
        </div>
        <div class="track__author">
          <template v-if="item.artist && item.artist != ''">
            {{ item.artist }}
          </template>
          <template v-else-if="item.composer && item.composer != ''">
            {{ item.composer }}
          </template>
          <template v-else>
            Unknown Artist
          </template>
        </div>
      </div>  
    </div>
    
    <div class="track__time">
      {{ item.duration_str }}
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex';
export default {
  name: 'gradient-bg-button',
  props: ['item'],
  computed: {
    ...mapState('playlist', ['isPlaying', 'currentIndex']),
    ...mapGetters('playlist', ['getTrack']),
  },
  watch: {
    'isPlaying': function () {
      this.toggleIsPlaying()
    },
    'currentIndex': function () {
      if (this.getTrack && this.getTrack.id == this.item.id && this.isPlaying == true) {
        this.playing = true
      } else {
        this.playing = false
      }
    }
  },
  data () {
    return {
      playing: false
    }
  },
  methods: {
    toggleIsPlaying() {
      if (this.getTrack && this.getTrack.id == this.item.id && this.isPlaying == true) {
        this.playing = true
      } else {
        this.playing = false
      }
    },
  },
  mounted() {
    this.toggleIsPlaying()
    console.log('item', this.item);
  }
}
</script>

<style lang="sass">
@import '~@styles/components/track.sass'
</style>
