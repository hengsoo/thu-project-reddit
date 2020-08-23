<template>
  <div id="app" class="h-screen bg-teal-100 ">

    <Navigator :is-auth="isAuth">
      <router-link to="/" exact class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </router-link>

      <template v-slot:button>
        <a href="#"
           class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white
             hover:border-transparent hover:text-teal-500 hover:bg-white mb-2 mt-4 md:mt-0"
           @click="logout">
          Logout
        </a>
      </template>

    </Navigator>

    <router-view @authenticated="isAuth = true"/>

  </div>
</template>

<script>
import Navigator from '@/components/Navigator'

export default {
  components: { Navigator },
  data () {
    return {
      isAuth: false
    }
  },
  methods: {
    logout () {
      this.$http.patch('/api/v1/logout')
        .then( (res)=>{
          this.isAuth = false
          this.$cookie.delete('user-token')
          this.$router.push('/login')
        })
      .catch( (error)=>{
        console.error('Logout failed: ', error)
      })

    }
  }
}
</script>

<style src="./assets/css/tailwind.css"/>
