<template>

  <div class="w-full bg-white rounded-lg divide-y divide-gray-400 shadow-md">

    <!--  Title Input  -->
    <label>
      <input type="text" v-model="postTitle" placeholder="Make a title!"
             class="font-bold text-xl focus:outline-none pl-4 my-2">
    </label>
    <!--  Content Editor  -->
    <div class="pt-1">
      <WysiwygEditor class="w-full post-editor" ref="post-editor"
                     :placeholder="`What's on your mind, ${nickname}?`"
                     :initial-content="initialContentWithLineBreak">

        <div class="mt-1 pb-2 mx-2 flex justify-end" slot="footer">
          <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-3 rounded
                     focus:outline-none focus:shadow-outline" type="button"
              @click="submitPost(postTitle, postContent, postId)">
            {{ buttonLabel }}
          </button>

        </div>

      </WysiwygEditor>
    </div>

  </div>

</template>

<script>
import { EventBus } from '@/helpers/EventBus'
import WysiwygEditor from '@/components/WysiwygEditor'

export default {
  name: 'PostForm',

  components: {
    WysiwygEditor
  },

  props: {
    initialTitle: {
      type: String,
      default: ''
    },
    initialContent: {
      type: String,
      default: ''
    },
    buttonLabel: {
      type: String,
      default: 'Post'
    },
    postId: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      postTitle: ''
    }
  },

  computed: {
    nickname () {
      const nickname = this.$store.state.userData.nickname
      if (nickname === undefined) {
        return 'my friend'
      } else {
        return nickname
      }
    },

    initialContentWithLineBreak () {
      return this.initialContent.replace(/<br>/g, '<p></p>')
    },

    postEditor () {
      return this.$refs['post-editor'].editor
    },

    postContent () {
      return this.postEditor.getHTML().replace(/<p>\s*<\/p>/g, '<br>')
    }
  },

  methods: {
    submitPost (title, content, editPostId = null) {

      let url = '/api/v1/post'
      let submitMethod = this.$http.post

      if (editPostId !== null) {
        url += '/' + editPostId
        submitMethod = this.$http.put
      }

      submitMethod(url, {
        title: title,
        content: content
      })
          .then(res => {

            if (editPostId !== null) {
              EventBus.$emit('post-update-details')
            } else {
              EventBus.$emit('update-post-board')
              this.postEditor.clearContent()
              this.postTitle = ''
            }

          })
          .catch(error => console.error('Submit Post Failed: ', error))
    }
  },

  mounted () {
    this.postTitle = this.initialTitle
  },
}
</script>

<style scoped>
.post-editor {
  box-shadow: none;
}
</style>
