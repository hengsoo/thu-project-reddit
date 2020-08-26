import { EventBus } from '@/helpers/EventBus'

let SubmitReplyMixin = {

  methods: {
    findReplyEditor (replyId) {
      let replyEditor = this.$refs['reply-editor-' + replyId]

      if (!Array.isArray(replyEditor)) {
        replyEditor = [replyEditor][0]
      }

      return replyEditor
    },

    submitReply (postId, replyId) {

      const replyEditor = this.findReplyEditor(replyId)

      const content = replyEditor.editor.getHTML()

      this.$http.post('/api/v1/post/' + postId + '/reply', {
        replyId: replyId,
        content: content
      })
        .then(res => {
          EventBus.$emit('post-update-reply')
          this.toggleEditorState(replyId)
        })
        .catch(error => console.error('Submit Reply Failed: ', error))
    },

    toggleEditorState (replyId) {
      const replyEditor = this.findReplyEditor(replyId)
      replyEditor.$el.classList.toggle('hidden')
      replyEditor.editor.clearContent()
    },
  }
}

export default SubmitReplyMixin
