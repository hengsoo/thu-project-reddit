import { EventBus } from '@/helpers/EventBus'

let SubmitPostMixin = {

  methods: {
    submitPost (title, content, editPostId = 0) {

      let url = '/api/v1/post'
      let submitMethod = this.$http.post

      if (editPostId !== 0) {
        url += '/' + editPostId
        submitMethod = this.$http.put
      }

      submitMethod(url, {
        title: title,
        content: content
      })
        .then(res => {
          EventBus.$emit('post-update-details')
        })
        .catch(error => console.error('Submit Post Failed: ', error))
    }
  }

}

export default SubmitPostMixin
