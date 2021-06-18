<template>
    <div class="collection">
        <div class="collection__info">
            <div class="collection__img">
                <img :src="img" alt="name">
            </div>
            <div class="collection__right">
                <div class="collection__name">
                    {{ name }}
                </div>
                <div class="collection__tags">
                    <div
                        v-for="item in tags"
                        class="collection__tag tag collection__activeTag"
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
                v-for="(item,index) in tracks"
                :id="item.id"
                :name="item.title"
                :author="item.artist"
                :time="item.duration_str"
                @click="startPlaylist(index, tracks)"
                :key="item.id"
            />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Track from '@components/track'
    import {mapMutations} from 'vuex';
    export default {
        name: 'collection',
        props: ['id'],
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
            }
        },
        components: {
            'track-cmp': Track
        },
        computed: {
            tracksData() {
                let formData = new FormData()
                for (let key in this.tracksFilters) {
                    formData.append(`${key}`, this.tracksFilters[key])
                }
                formData.append('pagination[filters][collection_id]', this.id)
                return formData
            },
            tagsData() {
                let formData = new FormData()
                formData.append('pagination[filters][collection_id]', this.id)
                return formData
            }
        },
        methods: {
            ...mapMutations('playlist', ['setPlaylist']),
            getTracks() {
                let action = 'track/track/list_ajax'
                let method = 'post'
                Vue.http[method](action, this.tracksData)
                    .then(response => response.json())
                    .then(data => {
                        this.tracks  = data.table.records
                    }, data => {
                    })    
            },
            startPlaylist(index, tracks) {
                this.setPlaylist({
                    playlist: tracks,
                    index,
                    id: this.id
                })
            },
            getCollection() {
                let action = 'track/collection/list_ajax'
                let method = 'post'
                let formdata = new FormData()
                formdata.append('pagination[filters][id]', this.id)

                Vue.http[method](action, formdata)
                .then(response => response.json())
                .then(data => {
                    console.log('collection', data.table.records[0]);
                    this.name = data.table.records[0].name
                    this.img = data.table.records[0].cover_file_id_url
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
            // this.id = this.$route.params.id
            this.getCollection()
            this.getTags()
            this.getTracks()
        }
    }
</script>

<style lang="sass" scoped>
@import '~@styles/components/collection.sass'
</style>