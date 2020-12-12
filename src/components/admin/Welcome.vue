<template>
  <div class="Welcome">
    Welcome
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Welcome",
  components: {}
})
export default class Welcome extends Vue {}
</script>

<style lang="scss" scope>
.Welcome {
}
</style>
