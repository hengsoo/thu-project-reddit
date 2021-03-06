<template>

  <div class="w-full md:mr-20 flex flex-col items-center max-w-lg post-board">

    <CircularProgress v-if="allPosts.length === 0" class="w-full rounded bg-white my-2"/>

    <!--  Infinite List of Posts    -->
    <div v-for="post in allPosts"
         class="w-full rounded overflow-hidden shadow-lg bg-white my-2">

      <!--  Post   -->
      <div class="px-6 py-4 cursor-pointer hover:bg-gray-100"
           @click="$router.push('/post/'+ post.id ).catch(err => {})">
        <!--    Title     -->
        <div class="font-bold text-xl mb-2">{{ post.title }}</div>
        <!--    Content    -->
        <div class="max-h-sm overflow-hidden">
          <!--    If content has both thumbnail and summary     -->
          <div v-if="post.thumbnail" class="flex">
            <div class="w-3/4" v-html="post.summary" v-if="post.summary"></div>
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
          @click="$router.push(
            { path: `/user/${post.userId}`,
              query:{username: post.nickname}
            }).catch(err => {})"
        >
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

    <p v-if="endOfAllPosts" class="max-w-sm lg:max-w-md text-center text-gray-600">
      — Hooray! You have reached the end. —
    </p>

    <!--  Scroll to top button  -->
    <font-awesome-icon icon="arrow-circle-up" class="back-to-top"
                       :class="{'opacity-0 invisible': !backToTop } " @click="scrollToTop"/>

  </div>

</template>

<script>
import CircularProgress from '@/components/CircularProgress'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowCircleUp)

const xss = require('xss')
const moment = require('moment')

export default {
  name: 'InfiniteScroll',
  components: { CircularProgress },

  props: {
    postPerPage: {
      type: Number,
      default: 10
    },
    userId: {
      type: Number,
      default: null
    },
    routeName: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      page: 1,
      allPosts: [],
      endOfAllPosts: false,
      isLoading: false,
      backToTop: false
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

  methods: {
    getAllPost () {
      this.isLoading = true
      this.$http.get('/api/v1/post', { params: this.queryParams }).then(
        response => {

          if (this.queryParams.page * this.queryParams.size >= response.data['total']) {
            this.endOfAllPosts = true
          }

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

              post.created = moment(post.created).fromNow()

              this.allPosts.push(post)
              this.isLoading = false

            }
          )
        }
      ).catch(error => console.error('View All Post Failed: ', error))
    },

    refreshPostBoard(){
      this.allPosts = []
      this.page = 1
      this.endOfAllPosts = false
      this.getAllPost()
    },

    scrollToTop(){
      window.scrollTo({top: 0,behavior: 'smooth'})
    },

    scroll () {
      document.onscroll = () => {

        if (document.documentElement.scrollTop > 300) {
          if (this.backToTop === false) this.backToTop = true
        } else {
          if (this.backToTop === true) this.backToTop = false
        }

        if (this.$route.name !== this.routeName || this.endOfAllPosts === true) return

        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight
          >= document.documentElement.offsetHeight / 2

        if (bottomOfWindow && this.isLoading === false) {
          this.queryParams.page += 1
          this.getAllPost()
        }
      }
    },

  },

  beforeMount () {
    this.getAllPost()
    this.scroll()
  },
}
</script>

<style>
.post-board img {
  margin: 0 auto;
  height: 60px;
  width: 60px;
  background-size: cover;
}

.thumbnail-only img {
  height: unset;
  max-height: 24rem;
  width: unset;
  background-size: cover;
}

.back-to-top {
  @apply text-white fixed text-5xl bg-teal-500 p-1 rounded-full z-50 cursor-pointer;
  right: 4rem;
  bottom: 3rem;
  transition-property: opacity, visibility, background-color;
  transition-duration: 0.25s;
  transition-timing-function: ease-out;
}

.back-to-top:hover{
  @apply bg-teal-400
}

</style>
