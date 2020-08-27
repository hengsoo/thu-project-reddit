<template>
  <div class="container p-5 mx-auto flex flex-col items-center max-w-xl">
    <!--  Post    -->
    <div class="w-full md:mr-20 rounded-t-lg shadow-lg bg-white mt-2">

      <CircularProgress v-if="title === ''"/>

      <div v-else class="px-6 py-4">

        <div class="inline-flex justify-between w-full">
          <div class="inline-flex text-gray-600">
            <div class="text-sm mr-2">Posted by
              <span class="hover:underline cursor-pointer"
                    @click="$router.push(
                      { path: `/user/${authorId}`,query:{username: author}}).catch(err => {})">
                {{ author }}
              </span>
            </div>
            <div class="text-sm">{{ datetime }}</div>
          </div>
          <font-awesome-icon icon="edit" class="text-gray-400 cursor-pointer"
                             @click="showPostEditor = !showPostEditor"
                             v-if=" authorId === authUserId"/>
        </div>


        <div class="divide-y divide-gray-400" :class="{hidden: showPostEditor}">
          <!--    Title     -->
          <div class="font-bold text-xl mb-2">{{ title }}</div>
          <!--    Content    -->
          <div v-html="content" class="pt-2"></div>
        </div>

        <div :class="{hidden: !showPostEditor}" v-if="authorId === authUserId">
          <PostForm :post-id="id" :initial-content="content" :initial-title="title" button-label="Done"/>
        </div>

      </div>

    </div>

    <div class="w-full mb-20 md:mr-20 bg-gray-100 rounded-b-lg px-6 py-2 divide-y">
      <div class="inline-flex justify-between w-full items-baseline">

        <div class="inline-flex items-baseline">
          <h2 class="text-left text-lg italic mr-2">
            {{ commentLabel }}
          </h2>

          <p class="text-left text-sm italic cursor-pointer text-gray-600
            hover:underline tracking-tight" @click="showAuthorCommentOnly = !showAuthorCommentOnly">
            {{ commentControlLabel }}
          </p>
        </div>

        <p class="text-blue-500 text-sm cursor-pointer font-semibold"
           @click="showCommentEditor = !showCommentEditor">
          Add a comment
        </p>
      </div>

      <div class="pt-1">
        <WysiwygEditor class="w-full" ref="reply-editor-0" :class="{hidden: !showCommentEditor}"
                       placeholder="Add a comment...">
          <div class="mt-1 pb-2 mx-2 flex justify-end" slot="footer">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-3 rounded
          focus:outline-none focus:shadow-outline" type="button"
              @click="submitReply(id, 0)">
              Add Comment
            </button>
          </div>
        </WysiwygEditor>

        <div>
          <Reply :replies="nestedReplies" :post-user-id="authorId" :show-author-comment-only="showAuthorCommentOnly"/>
        </div>
      </div>

    </div>


  </div>
</template>

<script>

import CircularProgress from '@/components/CircularProgress'
import Reply from '@/components/Reply'
import Editor from '@/components/WysiwygEditor'
import WysiwygEditor from '@/components/WysiwygEditor'
import { EventBus } from '@/helpers/EventBus'
import SubmitReplyMixin from '@/helpers/SubmitReplyMixin'
import PostForm from '@/components/PostForm'

const xss = require('xss')
const moment = require('moment')

export default {
  name: 'PostDetails',

  mixins: [SubmitReplyMixin],

  components: {
    PostForm,
    WysiwygEditor,
    Reply,
    CircularProgress,
    Editor
  },

  data () {
    return {
      id: 0,
      title: '',
      content: '',
      author: '',
      authorId: 0,
      datetime: '',
      rawReplies: [],
      showCommentEditor: false,
      showPostEditor: false,
      showAuthorCommentOnly: false
    }
  },

  beforeMount () {
    this.getPostDetails()

    EventBus.$on('post-update-reply', this.getPostReplies)
    EventBus.$on('post-update-details', this.getPostDetails)
  },

  computed: {
    commentLabel () {
      const label = 'Comment'
      const commentCount = this.rawReplies.length

      if (commentCount > 1) {
        return label + 's' + ` (${commentCount})`
      } else {
        return label + ` (${commentCount})`
      }
    },

    commentControlLabel(){
      if ( this.showAuthorCommentOnly === false){
        return 'Show author only'
      }
      else{
        return 'Show all'
      }
    },

    nestedReplies () {
      let nestedReplies = this.nestReplies(this.rawReplies)
      // Show most recent thread first
      nestedReplies.sort(((a, b) => {
        return b.datetime.diff(a.datetime)
      }))
      return nestedReplies
    }
  },

  methods: {

    saveToCache (cookieName){
      const record = {title: this.title, path: `/post/${this.id}`}

      let cache = JSON.parse(this.$cookie.get(cookieName))

      if ( cache === null ) cache = [record]
      else {
        cache.unshift(record)
      }

      cache = JSON.stringify(cache)

      this.$cookie.set(cookieName, cache, { expires: '10m' })
    },

    requestPostDetails () {
      return this.$http.get('/api/v1/post/' + this.$route.params.id)
    },

    getPostDetails () {
      this.requestPostDetails()
        .then((response) => {
          this.id = response.data.id
          this.title = response.data.title
          this.content = xss(response.data.content)
          this.author = response.data.nickname
          this.authorId = response.data.userId
          this.datetime = moment(response.data['updated']).fromNow()
          this.rawReplies = response.data.reply
          this.showPostEditor = false

          this.saveToCache('user-history')
        }).catch(err => console.error('Get Post Details failed: ', err))
    },

    getPostReplies () {
      this.requestPostDetails()
        .then((response) => {
          this.rawReplies = response.data.reply
        }).catch(err => console.error('Get Post Replies failed: ', err))
    },

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
          reply['datetime'] = moment(reply['updated'])

          reply['children'] = this.nestReplies(replies, reply.id)
          nestedData.push(reply)
        })

      return nestedData
    },

  }
}
</script>

<style>

</style>
