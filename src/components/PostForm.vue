<template>

    <div class="w-full bg-white rounded-lg divide-y divide-gray-400 shadow-md">

      <label>
        <input type="text" v-model="postTitle" placeholder="Make a title!"
               class="font-bold text-xl focus:outline-none pl-4 my-2">
      </label>

      <div class="pt-1">
        <WysiwygEditor class="w-full post-editor" ref="post-editor"
                       :placeholder="`What's on your mind, ${nickname}`" :initial-content="initialContent">
          <div class="mt-1 pb-2 mx-2 flex justify-end" slot="footer">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-3 rounded
          focus:outline-none focus:shadow-outline" type="button"
              @click="submitPost(postTitle, postContent, postId)">
              Post
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

  data () {
    return {
      postTitle: ''
    }
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
    postId: {
      type: Number,
      default: null
    }
  },

  mounted () {
    this.postTitle = this.initialTitle
  },

  computed: {
    nickname () {
      return this.$store.state.userData.nickname
    },

    postEditor () {
      return this.$refs['post-editor'].editor
    },

    postContent () {
      return this.postEditor.getHTML()
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
          }

          this.postEditor.clearContent()
          this.postTitle = ''
        })
        .catch(error => console.error('Submit Post Failed: ', error))
    }
  }
}
</script>

<style scoped>
.post-editor {
  box-shadow: none;
}
</style>
