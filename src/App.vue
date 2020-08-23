<template>
  <div id="app" class="h-screen bg-teal-100 ">

    <Navigator>
      <router-link to="/" exact class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </router-link>

      <router-link to="/login" class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
        Login
      </router-link>
    </Navigator>

    <router-view/>

  </div>
</template>

<script>
import Navigator from '@/components/Navigator'

export default {
  components: { Navigator },
  data () {
    return {
      showMenu: false
    }
  }
}
</script>

<style src="./assets/css/tailwind.css"/>
