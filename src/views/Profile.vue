<template>
  <div class="container p-5 mx-auto flex flex-col items-center divide-y divide-teal-500">
    <div class="text-left md:mr-20 w-full flex items-baseline max-w-lg">
      <h2 class="font-bold text-3xl mr-2">{{ userData.nickname }}</h2>
      <p>@{{ userData.username }}</p>
    </div>
    <InfiniteScroll route-name="Profile" :user-id="userData.id"/>
  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'

export default {
  name: 'Profile',
  components: { InfiniteScroll },

  props: {
    userData: {
      type: Object,
      required: true
    }
  }
}
</script>
