<template>
    <div>
        <header-component></header-component>
        <div v-if="isAppLoading" class="text-center margin-top-100">
            <loader></loader>
        </div>
        <router-view v-else></router-view>
        <footer-component></footer-component>
    </div>
</template>
<script>
    import headerComponent from './components/header.vue'
    import footerComponent from './components/footer.vue'
    import loader from './components/loader.vue'

    export default {
        components: {headerComponent, footerComponent, loader },
        computed: {
            isAppLoading() {
                return this.$store.getters.isAppLoading;
            }
        }
    }
</script>