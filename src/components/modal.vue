<template>
    <transition name="fade">
        <div v-if="activeModalName !=''" class="modal">
            <div
                class="modal__content"
                :class="{'modal__content_info' : isInfoModal}"
                v-click-outside="outclickClose"
            >
                <div class="arrow" @click="closeModal">
                    <div class="arrow-content">
                        <div class="arrow__line arrow__line_first" />
                        <div class="arrow__line arrow__line_second" />
                    </div>
                </div>
                <component v-bind:is="activeModalName" key="activeModalName">
                </component>
            </div>
        </div>
    </transition>
</template>

<script>
    // import Vue from 'vue';
    import {mapState, mapMutations} from 'vuex';
    // дочерне компоненты
    import request from './modals/request.vue';
    import info from './modals/info.vue';

    export  default {
        data() {
            return {
                // transiton: 'fade',
                isContent: true
            }
        },
        watch: {
            'activeModalName': function() {
                if (this.activeModalName != '') {
                    document.addEventListener('keydown', this.fullAddEvents);
                    // document.body.style.overflowY = 'hidden'
                    setTimeout(() => {
                        this.isContent = true;
                    },100)
                } else {
                    // document.body.style.overflowY = 'unset'
                    this.isContent = false;
                    document.removeEventListener('keydown', this.fullAddEvents);
                }
            }
        },
        components: {
            request,
            info
        },
        computed: {
            ...mapState('modal', ['activeModalName'])
        },
        methods: {
            ...mapMutations('modal', ['closeModal']),
            outclickClose() {
                this.isContent = false;
                setTimeout(() => {
                    this.closeModal();
                },100)  
            },
            fullAddEvents(e) {
                if (e.code == 'Escape') {
                    this.outclickClose();
                }
            },
        },
        created() {
        },
        mounted() {
        }
    }
</script>

<style lang="sass">
@import '~@styles/components/modal.sass'
</style>