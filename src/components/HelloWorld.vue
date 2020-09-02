<template>
  <div class="hello">
    <h1>touch-ripple</h1>
    <m-touch-ripple :opacity="0.2" @mousedown="click">
      <img alt="Vue logo" src="../assets/logo.png" />
    </m-touch-ripple>
    <h1>icon</h1>
    <m-icon name="home"></m-icon>
    <m-icon name="loading"></m-icon>
    <m-icon name="search" style="color: red"></m-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MTouchRipple, MIcon } from '../../packages/index'
export default defineComponent({
  name: 'HelloWorld',
  components: { MTouchRipple, MIcon },
  props: {
    msg: String,
  },
  methods: {
    click() {
      console.log(1)
    },
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.image-box {
  width: 30%;
  padding: 2rem;
  border-radius: 4px;
  background-color: #ffffff;
  overflow: hidden;
}
</style>
