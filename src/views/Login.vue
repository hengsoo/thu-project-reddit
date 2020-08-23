<template>

  <div class="max-w-sm mx-auto p-5">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" type="text" placeholder="Username" v-model="username" required autofocus>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" placeholder="Password" v-model="password" required>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" @click.prevent="handleSubmit">
          Sign In
        </button>
      </div>
    </form>
  </div>

</template>

<script>
export default {
  data () {
    return {
      username: '2018080124',
      password: '878112'
    }
  },
  methods: {
    handleSubmit () {
      if (this.password.length > 0) {
        this.$http.patch('/api/v1/login', {
          username: this.username,
          password: this.password
        })
          .then(response => {
            console.log(response)
          })
          .catch(function (error) {
            console.error(error.response)
          })
      }
    }
  }
}

</script>
