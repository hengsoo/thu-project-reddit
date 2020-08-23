<template>
  <div id="app" class="h-screen bg-teal-100 ">

    <Navigator :is-auth="isAuth">
      <router-link to="/" exact class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </router-link>

      <router-link to="/a" exact class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
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
  name: 'App',

  components: { Navigator },

  data () {
    return {
      isAuth: false
    }
  },

  mounted () {
    this.$http.interceptors.response.use(
      this._handleOnHttpFulfilled,
      this._handleOnHttpError
    )
  },

  methods: {
    invalidateAuth () {
      this.isAuth = false
      this.$cookie.delete('user-token')
    },

    logout () {
      this.$http.patch('/api/v1/logout')
        .then((res) => {
          this.invalidateAuth()
          this.$router.push('/login').catch(() => {
          })
        })
        .catch((error) => {
          console.error('Logout failed: ', error)
        })
    },

    _handleOnHttpFulfilled (response) {
      if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    },

    _handleOnHttpError (error) {
      if (error.response.status) {
        switch (error.response.status) {
          case 401:
            this.invalidateAuth()
            this.$swal('Hello Vue world!!!').then(
              () => this.$router.push('/login')
            )
            break
        }
        return Promise.reject(error.response)
      }
    },

  }
}
</script>

<style src="./assets/css/tailwind.css"/>
