<template>
  <div class="hello">
    <h1 >{{ msg }}</h1>
    <touch-ripple :opacity="0.2" @mousedown="click">
      <img alt="Vue logo" src="../assets/logo.png" />
    </touch-ripple>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TouchRipple } from '../../packages/index'
export default defineComponent({
  name: 'HelloWorld',
  components: { TouchRipple },
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
