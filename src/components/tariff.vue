<template>
    <div class="tariff">
        <div class="tariff__left">
            <div class="tariff__title">
                {{ name }}
            </div>
            <div class="tariff__about" v-html="about" />
            <div class="tariff__price">
                <template v-if="price != 0">
                    {{ price }} ₽
                </template>
                <template v-else>
                    ~ ₽
                </template>
            </div>
            <div class="tariff__description" :class="{'tariff__description_hidden': price == 0}">
                в месяц
            </div>
            <div class="tariff__row">
                <div
                    class="tariff__button button__bg button"
                    @click="toRequest"
                >
                    Оставить заявку
                </div>
                <!-- <a href="https://enter.yoga/catalog/" target="_blank" class="tariff__catalog button__border button__border_small button">
                    В каталог
                </a> -->
            </div>
        </div>
        <div class="tariff__img">
            <img :src="`${img}`" alt="tariff image">
        </div>
    </div>
</template>

<script>
// import {mapState, mapMutations} from 'vuex';
// import getTariffs from '@components/mixins/getTariffs'
export default {
     name: 'tariffs',
//   mixins: [getTariffs],
    props: ['id', 'name', 'altName', 'about', 'price', 'img'],
    data () {
      return {
          filters: []
      }
    },
    computed: {
    },
    methods: {
        toRequest() {
            this.$emit('request', this.name)
            ym(80155144,'reachGoal','form_send')
        }
    },
    mounted() {
    }
}
</script>

<style lang="sass">
@import '~@styles/components/tariff.sass'
</style>
