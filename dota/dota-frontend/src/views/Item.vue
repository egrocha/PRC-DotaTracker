<template>
  <Item :name="$route.params.name"/>
</template>

<script>
  import Item from '../components/Item'

  export default {
    components: {
      Item
    }
  }
</script>
