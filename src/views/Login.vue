<template>

  <div class="max-w-sm mx-auto p-5 mt-10">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <!--  Username Input   -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder="Username" v-model="username" required autofocus>
      </div>
      <!--   Password Input  -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="Password" v-model="password" required>
        <p class="text-red-500 text-xs italic" v-text="errorMessage"></p>
      </div>

      <!--   Sign In Button   -->
      <div class="flex items-center justify-between">
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" @click.prevent="isLoading === false ? handleSubmit(): null"
            :class="{disabled: isLoading}">
          Sign In
        </button>
        <!--    Loading Indicator    -->
        <CircularProgress v-if="isLoading" class="h-1 pr-8"/>
      </div>

    </form>
  </div>

</template>

<script>
import CircularProgress from '@/components/CircularProgress'
import Editor from '@/components/WysiwygEditor'

export default {
  components: {
    Editor,
    CircularProgress
  },
  data () {
    return {
      username: '2018080124',
      password: '878112',
      errorMessage: '',
      isLoading: false
    }
  },

  methods: {
    handleSubmit () {
      this.isLoading = true

      if (this.password.length > 0) {
        this.$http.patch('/api/v1/login', {
          username: this.username,
          password: this.password
        })
            // If login succeeded, proceed to homepage or nextUrl
            .then(response => {
                  // Get token and save it in cookie for 10 mins
                  const jwt = response.data.jwt
                  this.$cookie.set('user-token', jwt, { expires: '10m' })
                  this.$http.defaults.headers.common['Authorization'] = jwt

                  // Authenticate user
                  this.$http.get('/api/v1/user').then(response => {
                    this.$store.commit('setIsAuth', true)
                    this.$store.commit('setUserData', response.data)

                    this.isLoading = false

                    const nextUrl = this.$route.query.nextUrl
                    // Redirect to next Url if exists
                    if (nextUrl != null) {
                      this.$router.push(nextUrl.toString()).catch(() => {
                      })
                    } else {
                      this.$router.push('/').catch(() => {
                      })
                    }
                  }).catch(
                      error => console.error('Validate Auth error: ', error)
                  )
                }
            )
            // Else display error
            .catch((error) => {
              console.error(error.response)
              this.errorMessage = error.response.data.message
            })
      }
    },

  },

  beforeCreate () {
    // If user token exists
    if (this.$cookie.get('user-token') != null) {
      this.$router.push('/')
    } else {
      this.$store.commit('setIsAuth', false)
    }
  },

}

</script>

<style scoped>
.disabled {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed
}
</style>
