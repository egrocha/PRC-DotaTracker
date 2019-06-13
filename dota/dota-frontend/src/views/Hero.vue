<template>
  <Hero :name="$route.params.name"/>
</template>

<script>
  import Hero from '../components/Hero'

  export default {
    components: {
      Hero
    }
  }
</script>
