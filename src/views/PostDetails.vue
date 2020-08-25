<template>
  <div class="container p-5 mx-auto flex flex-col items-center max-w-xl">
    <!--  Infinite List of Posts    -->
    <div class="w-full rounded overflow-hidden shadow-lg bg-white my-2">

      <CircularProgress v-if="content === ''"/>
      <!--  Post   -->
      <div v-else class="px-6 py-4 divide-y divide-gray-400">
        <!--    Title     -->
        <div class="font-bold text-xl mb-2">{{ title }}</div>
        <!--    Content    -->
        <div v-html="content"></div>
      </div>

    </div>
  </div>
</template>

<script>

import CircularProgress from '@/components/circular-progress'
const xss = require('xss')
const moment = require('moment')

export default {
  name: 'PostDetails',
  components: { CircularProgress },
  data () {
    return {
      title: '',
      content: ''
    }
  },

  beforeCreate () {
    this.$http.get('/api/v1/post/' + this.$route.params.id)
      .then((response) => {
        this.title = response.data.title
        this.content = response.data.content
      }).catch(err => console.error('Get Post Details failed: ', err))
  },

  computed: {}
}
</script>

<style>

</style>
