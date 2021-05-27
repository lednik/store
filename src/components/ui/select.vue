<template>
    <div class="select">
        <div 
            @click="showOptions"
            class="select__value select__item"
            v-click-outside="hideOptions"
        >
            {{ value }}
        </div>
        <transition name="show">
            <div v-if="isOptions" class="select__options">
                <div class="select__option select__item"
                    v-for="(item, index) in options"
                    @click="setValue(item.value)"
                    :key="`option-${index}`"
                >
                    {{ item.value }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'menu',
    props: ['options', 'startOption'],
    components: {
    },
    data () {
        return {
            isOptions: false,
            value: ''
        }
    },
    methods: {
        setValue(value) {
            this.hideOptions()
            this.value = value
        },
        showOptions() {
            console.log('showOptions');
            this.isOptions = true
        },
        hideOptions() {
            this.isOptions = false
        }
    },
    mounted() {
        this.value = this.startOption
    }
}
</script>

<style lang="sass">
@import '~@styles/components/ui/select.sass'
</style>
