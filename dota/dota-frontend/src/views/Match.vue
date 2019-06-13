<template>
  <Match :matchId="$route.params.match_id"/>
</template>

<script>
  import Match from '../components/Match'

  export default {
    components: {
      Match
    }
  }
</script>
