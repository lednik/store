<template>
  <div class="tarif-card">
    <div class="tarif-card__name">
      {{ name }}
    </div>
    <div class="tarif-card__about">
      {{ about }}
    </div>
    <div class="tarif-card__price">
      <template v-if="price != 0">
        {{ price }}
      </template>
      <template v-else>
        ~ ₽
      </template>
    </div>
    <div class="tarif-card__description" :class="{'tarif-card__description_hidden': price == 0}">
      в месяц
    </div>
    <div class="tarif-card__button button__bg button">
      Оставить заявку
    </div>
  </div>
</template>

<script>
export default {
  name: 'tarif',
  props: ['id', 'name', 'altName', 'about', 'price'],
  data () {
    return {
    }
  }
}
</script>

<style lang="sass">
@import '~@styles/components/tarif-card.sass'
</style>
