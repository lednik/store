<template>
    <div
        class="collection-card"
      >
        <div class="collection-card__poster">
          <img :src="item.cover_file_id_url" alt="item.name" class="collection-card__img">
          <div class="collection-card__bg">
            <div class="collection-card__button">
              <svg v-if="false" class="collection-card__stop collection-card__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="2" width="6" height="28" fill="white"/>
                <rect x="20" y="2" width="6" height="28" fill="white"/>
              </svg>
              <svg v-else class="collection-card__play collection-card__icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 28V0L28 13.7021L0 28Z" fill="white"/>
              </svg>
            </div>  
          </div>
        </div>
        <p class="collection-card__name">{{item.name}}</p>
    </div>
</template>

<script>
    export default {
        props: ['item']
    }
</script>

<style lang="sass" scoped>
@import '~@styles/components/collection-card.sass'
</style>