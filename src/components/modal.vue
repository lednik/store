<template>
    <transition name="fade">
        <div v-if="activeModalName !=''" class="modal">
            <transition :name="transiton">
                <div
                    v-if="isContent"
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
            </transition>
        </div>
    </transition>
</template>

<script>
    // import Vue from 'vue';
    import {mapState, mapMutations} from 'vuex';
    // дочерне компоненты
    import request from './modals/request.vue';
    // import Login from './login/component.vue';
    // import SuccessModal from './success-modal/component.vue';
    // import SupportModal from './support-modal/component.vue';
    // import AddCourse from './add-course/component.vue';
    // import WhyUsModal from './why-us-modal/component.vue';
    // import FilterModal from './filter-modal/component.vue';
    // import CourseModules from './course-modules/component.vue';

    export  default {
        data() {
            return {
                transiton: 'fade',
                isContent: true
            }
        },
        watch: {
            'activeModalName': function() {
                if (this.activeModalName != '') {
                    document.addEventListener('keydown', this.fullAddEvents);
                    document.body.style.overflowY = 'hidden'
                    setTimeout(() => {
                        this.isContent = true;
                    },100)
                } else {
                    document.body.style.overflowY = 'unset'
                    this.isContent = false;
                    document.removeEventListener('keydown', this.fullAddEvents);
                }
            }
        },
        components: {
            request,
            // Login,
            // SuccessModal,
            // SupportModal,
            // AddCourse,
            // WhyUsModal,
            // FilterModal,
            // CourseModules
        },
        computed: {
            ...mapState('modal', ['activeModalName','isInfoModal'])
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
            if (window.innerWidth < 768) {
                this.transiton = 'mobilemodal';
            }
        },
        mounted() {
        }
    }
</script>

<style lang="sass">
@import '~@styles/components/modal.sass'
</style>