<script>
    export default {
        computed: {
            ...mapState('playlist', ['id']),
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
        }
    }
</script>