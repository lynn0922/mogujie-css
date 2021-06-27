<template>
    <div class="c-swipe">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'CSwipe',
    props: {
        list: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        }
    }
}
</script>
<style lang="scss" scoped>
@include b(c-swipe) {
    white-space: nowrap;
    overflow: auto;
    scroll-snap-type: x mandatory;
}
</style>
