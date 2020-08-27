<template>
  <div class="container p-5 mx-auto flex flex-col items-center divide-y divide-teal-500">
    <div class="text-left md:mr-20 w-full flex items-baseline max-w-lg">
      <h2 class="font-bold text-3xl mr-2">{{ username }}</h2>
      <p>&nbsp;'s profile</p>
    </div>
    <infinite-scroll route-name="User" :user-id="Number($route.params.id)"/>
  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'

export default {
  name: 'UserDetails',
  components: { InfiniteScroll },
  computed: {
    username(){
      if (  this.$route.query.username === undefined ){
        return "User #" + this.$route.params.id
      }
      else{
        return this.$route.query.username
      }
    }
  }
}
</script>
