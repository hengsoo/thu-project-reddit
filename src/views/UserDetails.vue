<template>
  <div class="container p-5 mx-auto flex flex-col items-center">
    <infinite-scroll route-name="UserDetails" :user-id="Number($route.params.id)"/>
  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'

export default {
  name: 'UserDetails',
  components: { InfiniteScroll }
}
</script>
