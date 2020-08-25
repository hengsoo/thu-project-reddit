<template>

</template>

<script>
export default {
  name: 'Reply',
  props: {
    replies: {
      type: Array,
      required: true
    }
  },

  computed:{
    nestedReplies () {
      return this.nestReplies(this.replies)
    }
  },

  mounted () {
    console.table(this.nestedReplies)
    console.table(JSON.stringify(this.nestedReplies))
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
          reply['children'] = this.nestReplies(replies, reply.id)
          nestedData.push(reply)
        })

      return nestedData
    }
  }

}
</script>

<style scoped>

</style>
