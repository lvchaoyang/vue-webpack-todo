<template>
    <div id="app">
        <div id="cover"></div>
        <defaultHead></defaultHead>
        <router-link to="/app">App</router-link>
        <router-link to="/login">Login</router-link>
        <router-view />
        <defaultFoot></defaultFoot>
    </div>
</template>

<script>
import defaultHead from './layout/defaultHead.vue'
import defaultFoot from './layout/defaultFoot.jsx'

export default {
  name: 'app',
  components: { defaultHead, defaultFoot }
}
</script>

<style lang="stylus" scoped>
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity 0.3
        z-index -1

</style>
