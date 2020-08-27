<template>
  <div class="container p-5 mx-auto flex flex-col items-center divide-y divide-teal-500">
    <div class="text-left md:mr-20 w-full flex items-baseline max-w-lg">
      <h2 class="font-bold text-3xl mr-2">{{ nickname }}</h2>
      <p>@{{ username }}</p>
    </div>
    <InfiniteScroll route-name="Profile" :user-id="userId"/>
  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'

export default {
  name: 'Profile',
  components: { InfiniteScroll },
  computed: {
    nickname () {
      return this.$store.state.userData.nickname
    },
    username () {
      return this.$store.state.userData.username
    },
    userId () {
      return this.$store.state.userData.id
    }
  }
}
</script>
