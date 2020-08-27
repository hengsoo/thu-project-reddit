<template>
  <div id="app" class="bg-teal-100 ">

    <Navigator :is-auth="isAuth">

      <router-link to="/" exact class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 w-auto">
        Home
      </router-link>

      <router-link to="/profile" exact class="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
        My Profile
      </router-link>

      <template v-slot:button>
        <p v-text="userNickname" class="mx-3 text-white font-semibold hidden md:block"></p>
        <a href="#"
           class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white
             hover:border-transparent hover:text-teal-500 hover:bg-white
             focus:border-transparent focus:text-teal-500 focus:bg-white mt-3 md:mt-0"
           @click="logout">
          Logout
        </a>
      </template>

    </Navigator>

    <router-view @authenticated="validateAuth"/>


  </div>
</template>

<script>
import Navigator from '@/components/Navigator'

export default {
  name: 'App',

  components: { Navigator },

  computed: {
    userNickname () {
      return this.$store.state.userData.nickname
    },
    isAuth () {
      return this.$store.state.isAuth
    }
  },

  beforeMount () {
    this.$http.interceptors.response.use(
      this._handleOnHttpFulfilled,
      this._handleOnHttpError
    )

    const jwt = this.$cookie.get('user-token')
    if (jwt != null) {
      this.$http.defaults.headers.common['Authorization'] = jwt
      this.validateAuth()
    }
  },

  methods: {

    validateAuth () {
      this.$store.commit('setIsAuth', true)
      this.$http.get('/api/v1/user').then(response => {
        this.$store.commit('setUserData', response.data)
      }).catch(
        error => console.error('Validate Auth error: ', error)
      )
    },

    invalidateAuth () {
      this.$store.commit('setIsAuth', false)
      this.$store.commit('setUserData', {})
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
            this.$swal({
              title: 'Error!',
              text: 'Session expired',
              icon: 'error',
              confirmButtonText: 'Back to login'
            }).then(
              () => this.$router.push({
                path: '/login',
                query: { nextUrl: this.$route.path }
              }).catch()
            )
            break
          case 404:
            this.$swal({
              title: 'Error 404!',
              text: 'Path not found',
              icon: 'error',
              confirmButtonText: 'Take me back'
            }).then(
              () => this.$router.back()
            )
        }
        return Promise.reject(error.response)
      }
    },

  }
}
</script>

<style src="./assets/css/tailwind.css"/>
