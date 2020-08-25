<template>

  <div class="container p-5 mx-auto flex flex-col justify-center max-w-lg bg-teal-100 post-board">
    <!--  Infinite List of Posts    -->
    <div v-for="post in allPosts"
         class="max-w-sm lg:max-w-md rounded overflow-hidden shadow-lg bg-white my-2">

      <!--  Post   -->
      <div class="px-6 py-4 cursor-pointer hover:bg-gray-100"
           @click="$router.push('/post/'+ post.id ).catch(err => {})">
        <!--    Title     -->
        <div class="font-bold text-xl mb-2">{{ post.title }}</div>
        <!--    Content    -->
        <div class="max-h-sm overflow-hidden">
          <!--    If content has both thumbnail and summary     -->
          <div v-if="post.thumbnail" class="flex">
            <div class="w-3/4 truncate" v-html="post.summary" v-if="post.summary"></div>
            <div class="w-1/4" v-html="post.thumbnail" v-if="post.summary"></div>
            <!--    Center thumbnail if it doesn't have summary     -->
            <div class="w-full thumbnail-only" v-html="post.thumbnail" v-else></div>
          </div>
          <!--    If content has summary only      -->
          <div v-else class="flex">
            <div class="w-full" v-html="post.summary"></div>
          </div>
        </div>
      </div>

      <!--   Post Details  -->
      <div class="px-6 pt-4 pb-2">
        <!--   Author   -->
        <span
          class="inline-flex items-center bg-gray-200 rounded-full px-3 pr-4 py-1 text-base font-bold
            text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-gray-100"
          @click="$router.push('/user/'+ post.userId ).catch(err => {})">
            <!--   Icon    -->
            <svg viewBox="0 0 20 20" fill="currentColor" class="user w-6 h-6 mr-1">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
              </path>
            </svg>
            {{ post['nickname'] }}
          </span>

        <!--   Created Date   -->
        <span
          class="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold
            text-gray-700 mr-2 mb-2">
            <!--   Icon    -->
            <svg viewBox="0 0 20 20" fill="currentColor" class="clock w-6 h-6 mr-1">
              <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1
                    1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"></path>
            </svg>
            {{ post['created'] }}
          </span>
      </div>

    </div>

    <h2 v-if="endOfAllPosts" class="max-w-sm lg:max-w-md text-center text-gray-600">
      — End of all Posts —
    </h2>

  </div>

</template>

<script>
const xss = require('xss')
const moment = require('moment')

export default {
  name: 'InfiniteScroll',

  props: {
    postPerPage: {
      type:Number,
      default: 10
    },
    userId: {
      type:Number,
      default: null
    },
    routeName: {
      type:String,
      required: true
    }
  },

  data () {
    return {
      page: 1,
      allPosts: [],
      totalPost: 0,
      endOfAllPosts: false,
      isLoading: false
    }
  },

  computed: {

    queryParams () {
      let params = {
        page: this.page,
        size: this.postPerPage
      }

      if (!isNaN(this.userId)) {
        params.userId = this.userId
      }

      return params
    }

  },

  mounted () {
    this.getAllPost()
    this.scroll()
  },

  methods: {
    getAllPost () {
      this.isLoading = true
      this.$http.get('/api/v1/post', { params: this.queryParams }).then(
        response => {

          this.totalPost = response.data['total']

          response.data['posts'].forEach(
            (post) => {
              // Get first image as thumbnail
              let thumbnail = post.content.match(/<img([\w\W]+?)>/)
              if (thumbnail !== null) thumbnail = thumbnail[0]
              post.thumbnail = thumbnail

              // Keep text only
              post.summary = xss(post.content,
                {
                  whiteList: [],
                  stripIgnoreTag: true,
                  stripIgnoreTagBody: ['script']
                })

              const maxLength = 255
              if (post.summary.length > maxLength) {
                post.summary = post.summary.substring(0, maxLength)
                post.summary += ' ...'
              }

              const postCreated = moment(post.created)

              if (moment().diff(postCreated, 'days') < 3) {
                post.created = postCreated.fromNow()
              } else {
                post.created = postCreated.format('DD-MM-YYYY')
              }

              this.allPosts.push(post)
              this.isLoading = false
            }
          )
        }
      ).catch(error => console.error('View All Post Failed: ', error))
    },

    scroll () {
      document.onscroll = () => {
        if (this.$route.name !== this.routeName) return

        if (this.queryParams.page * this.queryParams.size >= this.totalPost) {
          this.endOfAllPosts = true
          return
        }

        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight
          >= document.documentElement.offsetHeight / 2

        if (bottomOfWindow && this.isLoading === false) {
          this.queryParams.page += 1
          this.getAllPost()
        }
      }
    },

  }
}
</script>

<style>
.post-board img {
  margin: 0 auto;
  height: 90px;
  width: 90px;
  background-size: cover;
}

.thumbnail-only img {
  height: unset;
  max-height: 24rem;
  width: unset;
  background-size: cover;
}

</style>
