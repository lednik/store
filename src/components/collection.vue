<template>
    <div class="collection">
        <div class="collection__info">
            <div class="collection__img">
                <svg class="collection__poster-icon" v-if="!img" width="53" height="60" viewBox="0 0 53 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M52 13.2477V2L18.7872 6.77855V18.0262M52 13.2477L18.7872 18.0262M52 13.2477V46.9908M18.7872 18.0262V51.7693M18.7872 51.7693C18.7872 55.7627 14.8054 59 9.89362 59C4.98181 59 1 55.7627 1 51.7693C1 47.776 4.98181 44.5387 9.89362 44.5387C14.8054 44.5387 18.7872 47.776 18.7872 51.7693ZM52 46.9908C52 50.9842 48.0182 54.2215 43.1064 54.2215C38.1946 54.2215 34.2128 50.9842 34.2128 46.9908C34.2128 42.9974 38.1946 39.7601 43.1064 39.7601C48.0182 39.7601 52 42.9974 52 46.9908Z" stroke="white" stroke-width="2"/>
                </svg>
                <img v-else :src="img" alt="name">
            </div>
            <div class="collection__right">
                <div class="collection__name">
                    {{ name }}
                </div>
                <div class="collection__tags">
                    <div
                        v-for="item in tags"
                        class="collection__tag tag collection__activeTag unselect"
                        :class="{'tag_active': item.isActive}"
                        :key="item.id"
                    >
                        <span class="tag__name">
                            {{item.name}}
                        </span>
                        <div class="tag__icon">
                            <div class="tag__line tag__line_1"/>
                            <div class="tag__line tag__line_2"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="collection__tracks">
            <track-cmp
                v-for="(item, index) in tracks"
                :item="item"
                @click="startPlaylist(index, tracks)"
                :key="item.id"
            />
            <div v-show="pageNumber + 1 < pagesCount" @click="pageNumber++" class="collection__loadMore button button__bg">
                Загрузить еще
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Track from '@components/track'
    import {mapMutations, mapState} from 'vuex';
    export default {
        name: 'collection',
        props: ['collectionId'],
        data() {
            return {
                tags: [],
                name: '',
                img: '',
                tracks: [],
                tracksFilters: {
                    'pagination[filters][demo_file_id_isnotnull]': true,
                    'update': 1
                },
                pageNumber: 0,
                pagesCount: 1
            }
        },
        components: {
            'track-cmp': Track
        },
        watch: {
            'pageNumber': function() {
                this.getTracks()
            }
        },
        computed: {
            ...mapState('playlist', ['id', 'isPlaying']),
            tracksData() {
                let formData = new FormData()
                for (let key in this.tracksFilters) {
                    formData.append(`${key}`, this.tracksFilters[key])
                }
                formData.append('pagination[filters][collection_id]', this.collectionId)
                formData.append('pagination[page_size]', 50)
                formData.append('pagination[page_no]', this.pageNumber)
                return formData
            },
            tagsData() {
                let formData = new FormData()
                formData.append('pagination[filters][collection_id]', this.collectionId)
                return formData
            }
        },
        methods: {
            ...mapMutations('playlist', ['setPlaylist', 'pushToPlaylist']),
            getTracks() {
                let action = 'track/track/list_ajax'
                let method = 'post'
                Vue.http[method](action, this.tracksData)
                    .then(response => response.json())
                    .then(data => {
                        // Object.assign(this.tracks, ...data.table.records)
                        // this.tracks  = data.table.records
                        this.tracks = this.tracks.concat(data.table.records)
                        this.pagesCount = data.table.pagination.page_count
                        if(this.pageNumber > 0 && this.collectionId == this.id) {
                            this.pushToPlaylist(data.table.records)
                        }
                    }, data => {
                    })    
            },
            startPlaylist(index, tracks) {
                this.setPlaylist({
                    playlist: tracks,
                    index,
                    id: this.collectionId
                })
            },
            getCollection() {
                let action = 'track/collection/list_ajax'
                let method = 'post'
                let formdata = new FormData()
                formdata.append('pagination[filters][id]', this.collectionId)

                Vue.http[method](action, formdata)
                .then(response => response.json())
                .then(data => {
                    this.name = data.table.records[0].name
                    this.img = data.table.records[0].cover_file_id_thumb
                    // this.collections = data.table.records
                }, data => {
                })
            },
            getTags() {
                let action = 'track/tag/list_ajax'
                let method = 'post'
                let formdata = this.tagsData
                Vue.http[method](action, formdata)
                .then(response => response.json())
                .then(data => {
                    this.tags = data.table.records
                    console.log('tags', this.tags);
                }, data => {
                })
            }
        },
        mounted() {
            // this.collectionId = this.$route.params.id
            this.getCollection()
            this.getTags()
            this.getTracks()
        }
    }
</script>

<style lang="sass" scoped>
@import '~@styles/components/collection.sass'
</style>