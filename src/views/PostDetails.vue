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
    <Editor></Editor>

    <div v-if="rawReplies.length > 0" class="w-full mb-20 md:mr-20 bg-gray-100 rounded-b-lg px-6 py-2 divide-y">
      <h2 class="text-left text-lg italic">Comments</h2>
      <div>
        <Reply :replies="nestedReplies"/>
      </div>
    </div>


  </div>
</template>

<script>

import CircularProgress from '@/components/CircularProgress'
import Reply from '@/components/Reply'
import Editor from '@/components/Editor'

const xss = require('xss')
const moment = require('moment')

export default {
  name: 'PostDetails',
  components: {
    Reply,
    CircularProgress,
    Editor
  },
  data () {
    return {
      title: '',
      content: '',
      rawReplies: []
    }
  },

  beforeCreate () {
    this.$http.get('/api/v1/post/' + this.$route.params.id)
      .then((response) => {
        this.title = response.data.title
        this.content = xss(response.data.content)
        this.rawReplies = response.data.reply
      }).catch(err => console.error('Get Post Details failed: ', err))
  },

  computed: {
    nestedReplies () {
      return this.nestReplies(this.rawReplies)
    }
  },

  methods: {
    nestReplies (replies, currentID = 0) {
      if (replies.length === 0) return []

      let nestedData = []
      let repliesOfCurrentID = replies.filter((reply) => reply['replyId'] === currentID)
      // Remove extracted replies
      replies = replies.filter((reply) => repliesOfCurrentID.indexOf(reply) === -1)

      repliesOfCurrentID.forEach(
        (reply) => {
          // Sanitize content
          reply['content'] = xss(reply['content'])
          // Parse Updated time
          reply['datetime'] =  moment(reply['updated']).fromNow()

          reply['children'] = this.nestReplies(replies, reply.id)
          nestedData.push(reply)
        })

      return nestedData
    }
  }
}
</script>

<style>

</style>
