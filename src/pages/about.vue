<template>
    <div class="about page">
        <div class="about__block">
            <div class="about__info">
                <div class="about__title">
                    Музыка для любых целей
                </div>
                <div class="about__about">
                    Сервис по предоставлению легальной музыки. Законное использование в коммерческих целях. Выбирай тариф и получи доступ к более, чем 500 000 трекам. Легальная музыка без нарушения авторских прав.
                </div>
            </div>
            <div class="about__blur">
                <img src="" alt="" class="about__img">
                <img src="" alt="" class="about__img-blur">
            </div>
            
        </div>
        <div class="home__content about__content">
          <div class="home__list container">
            <track-cmp
              v-for="item in tracks"
              :id="item.id"
              :name="item.title"
              :author="item.artist"
              :time="item.duration"
              :key="item.id"
            />
          </div>
          <div class="home__catalog button__border button">
            Перейти в каталог
          </div>
        </div>
    </div>
</template>

<script>
import Track from '@components/track'
// import {mapState, mapMutations} from 'vuex';
import getTracks from '@components/mixins/getTracks'
// import tariff from '@components/tariff'
export default {
  name: 'about',
  mixins: [getTracks],
  components: {
    'track-cmp': Track,
  },
  data () {
    return {
        filters: []
    }
  },
  computed: {
    //   ...mapState('modal', ['props']),
  },
  methods: {
    // ...mapMutations('modal', ['closeModal']),
  },
  mounted() {
    this.getTracks()
  }
}
</script>

<style lang="sass">
@import '~@styles/pages/about.sass'
</style>
