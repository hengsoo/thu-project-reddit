<template>
  <div class="container p-5 mx-auto flex flex-col items-center">
    <InfiniteScroll route-name="Home"/>
  </div>

</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'

export default {
  name: 'Home',
  components: { InfiniteScroll }
}

</script>

