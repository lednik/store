<template>
    <div class="collection page">
        <div class="catalog__tracks">
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
                for (let key in this.filters) {
                    formData.append(`${key}`, this.filters[key])
                }
                formData.append('pagination[filters][collection_id]', this.id)
                return formData
            },
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
        },
        mounted() {
            // this.id = this.$route.params.id
            this.getTracks()
        }
    }
</script>

<style lang="sass" scoped>
@import '~@styles/components/collection.sass'
</style>