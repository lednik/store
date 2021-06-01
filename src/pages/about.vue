<template>
    <div class="about page">
        <div class="about__block">
            <div class="about__info">
                <div class="about__title">
                    Музыка для любых целей
                </div>
                <div class="about__about">
                    Библиотека легальной музыки для производства аудио-роликов и законное использование в коммерческих целях, в том числе и для публичного исполнения. Выбирай тариф и получи доступ к более 500 000 трекам. Озвучивай фирменные ролики или транслируй в заведении.
                </div>
            </div>
            <div class="about__blur">
                <img src="/src/assets/images/about-1.png" alt="" class="about__img">
                <img src="/src/assets/images/about-1.png" alt="" class="about__img-blur">
            </div>
        </div>
        <div class="about__block about__block_reverse">
            <div class="about__info">
                <div class="about__title">
                    Идеальное решение
                </div>
                <div class="about__about">
                    <p class="about__paragraph">Подходит для продакшн-студий, <br> event-агентств и других компаний, занимающихся производством видеоматериалов.</p>
                    Используйте музыку для озвучивания подкастов, игр, роликов, постов в социальных сетях и любого другого контента.
                </div>
            </div>
            <div class="about__blur">
                <img src="/src/assets/images/about-2.png" alt="" class="about__img">
                <img src="/src/assets/images/about-2.png" alt="" class="about__img-blur">
            </div>
        </div>
        <div class="home__content about__content">
          <div class="about__list container">
            <track-cmp
              v-for="(item,index) in tracks"
              :id="item.id"
              :name="item.title"
              :author="item.artist"
              :time="item.duration_str"
              @click="startPlaylist(index, tracks)"
              :key="item.id"
            />
          </div>
          <a href="https://enter.yoga/catalog/" target="_blank" class="home__catalog button__border button">
            Перейти в каталог
          </a>
        </div>
    </div>
</template>

<script>
import Track from '@components/track'
// import {mapState, mapMutations} from 'vuex';
import getTracks from '@components/mixins/getTracks'
// import tariff from '@components/tariff'
import {mapMutations} from 'vuex';
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
    ...mapMutations('playlist', ['setPlaylist']),
    startPlaylist(index, traks) {
      this.setPlaylist({
        playlist: traks,
        index
      })
    }
  },
  mounted() {
    // this.getTracks()
  }
}
</script>

<style lang="sass">
@import '~@styles/pages/about.sass'
</style>
