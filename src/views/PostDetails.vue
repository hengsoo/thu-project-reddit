<template>
  <div class="container p-5 mx-auto flex flex-col items-center max-w-xl">
    <!--  Post    -->
    <div class="w-full md:mr-20 rounded-t-lg shadow-lg bg-white mt-2">

      <CircularProgress v-if="content === ''"/>

      <div v-else class="px-6 py-4 divide-y divide-gray-400">
        <!--    Title     -->
        <div class="font-bold text-xl mb-2">{{ title }}</div>
        <!--    Content    -->
        <div v-html="content"></div>
      </div>

    </div>

    <div v-if="replies.length > 0" class="w-full mb-20 md:mr-20 bg-gray-100 rounded-b-lg px-6 py-2 divide-y">
      <h2 class="text-left text-base italic">Comments</h2>
      <div>
        <Reply :replies="replies"/>
      </div>
    </div>


  </div>
</template>

<script>

import CircularProgress from '@/components/CircularProgress'
import Reply from '@/components/Reply'
const xss = require('xss')
const moment = require('moment')

export default {
  name: 'PostDetails',
  components: { Reply, CircularProgress },
  data () {
    return {
      title: '',
      content: '',
      replies: []
    }
  },

  beforeCreate () {
    this.$http.get('/api/v1/post/' + this.$route.params.id)
      .then((response) => {
        this.title = response.data.title
        this.content = xss(response.data.content)
        this.replies = response.data.reply
      }).catch(err => console.error('Get Post Details failed: ', err))
  },

  computed: {}
}
</script>

<style>

</style>
