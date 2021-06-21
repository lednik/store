<template>
    <div
        class="collection-card"
        @click="emitClick"
    >
        <div class="collection-card__poster">
            <svg class="collection-card__poster-icon" v-if="!item.cover_file_id_thumb" width="53" height="60" viewBox="0 0 53 60" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M52 13.2477V2L18.7872 6.77855V18.0262M52 13.2477L18.7872 18.0262M52 13.2477V46.9908M18.7872 18.0262V51.7693M18.7872 51.7693C18.7872 55.7627 14.8054 59 9.89362 59C4.98181 59 1 55.7627 1 51.7693C1 47.776 4.98181 44.5387 9.89362 44.5387C14.8054 44.5387 18.7872 47.776 18.7872 51.7693ZM52 46.9908C52 50.9842 48.0182 54.2215 43.1064 54.2215C38.1946 54.2215 34.2128 50.9842 34.2128 46.9908C34.2128 42.9974 38.1946 39.7601 43.1064 39.7601C48.0182 39.7601 52 42.9974 52 46.9908Z" stroke="white" stroke-width="2"/>
			</svg>
            <img v-else :src="item.cover_file_id_thumb" alt="item.name" class="collection-card__img">
            <div class="collection-card__bg" :class="{'collection-card__bg_active': isPlaying && isActive}">
                <div @click.stop="playCollection" class="collection-card__button">
                  <svg v-if="isPlaying && isActive" class="collection-card__stop collection-card__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import Vue from 'vue'
import {mapMutations, mapState} from 'vuex';
    export default {
        props: ['item'],
        data() {
            return {
                filters: {
                    'pagination[filters][demo_file_id_isnotnull]': true,
                    'update': 1
                },
                isActive: false
            }
        },
        computed: {
            ...mapState('playlist', ['id', 'isPlaying']),
            tracksData() {
                let formData = new FormData()
                for (let key in this.filters) {
                    formData.append(`${key}`, this.filters[key])
                }
                formData.append('pagination[filters][collection_id]', this.item.id)
                formData.append('pagination[filters][page_size]', 50)
                return formData
            },
        },
        watch: {
            'id': function() {
                this.updateIsActive()
            }
        },
        methods: {
            ...mapMutations('playlist', ['setPlaylist', 'setWaitingToggle']),
            playCollection() {
                if (this.id == this.item.id) {
                    this.setWaitingToggle(true)
                } else {
                    let action = 'track/track/list_ajax'
                    let method = 'post'
                    Vue.http[method](action, this.tracksData)
                        .then(response => response.json())
                        .then(data => {
                            let tracks  = data.table.records
                            this.setPlaylist({
                                playlist: tracks,
                                index: 0,
                                id: this.item.id
                            })
                        }, data => {
                        })    
                }
            },
            emitClick() {
                this.$emit('click', this.item.id)
            },
            updateIsActive() {
                if(this.item.id == this.id) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
            }
        },
        mounted() {
            this.updateIsActive()
        }
    }
</script>

<style lang="sass" scoped>
@import '~@styles/components/collection-card.sass'
</style>