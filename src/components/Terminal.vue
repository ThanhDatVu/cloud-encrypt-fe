<template>
  <div class="terminal">
    <div class="terminal__head">
      <div class="terminal__controls">
        <div class="terminal__button terminal__button--close"></div>
        <div class="terminal__button terminal__button--minimise"></div>
        <div class="terminal__button terminal__button--maximise"></div>
      </div>
      <div class="terminal__title">
        <h1 class="terminal__title-text">{{ title }}</h1>
      </div>
    </div>
    <div class="terminal__body">
      <div class="terminal__code">
        <code class="terminal__code-language">
          <ul class="terminal__commands-list">
            <li class="terminal__command terminal__command--output" v-html="text"></li>
            <li class="terminal__command terminal__command--input">$ </li>
          </ul>
        </code>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// define a prop in composition API
const prop = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
})

const text = prop.content.replace(/\n/g, "<br>");


</script>

<style scoped>
:root {
  --bg-color: #1e272e; 
  --header-color: #e2e2e2; 
  --close-btn-color: #ff6059;
  --minimise-btn-color: #ffbd2e;
  --maximise-btn-color: #29ca42;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: monospace;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background-color: 1e272e;
}

::selection {
  background-color: #fff;
  color: #111;
}

.terminal {
  display: block;
  width: 100%;
  border-radius: 0.27 rem;
  box-shadow: 0px 10px 45px rgba(0, 0, 0, 0.3);
  min-height: 200px;
  background-color: #1e272e;
}

.terminal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: #e2e2e2;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;  
}

.terminal__controls {
  display: flex;
  gap: 4px;
}

.terminal__title {
  flex-grow: 1;
}

.terminal__title .terminal__title-text {
  text-align: center;
  font-size: 14px;
}

.terminal__head .terminal__button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.terminal__button--close {
  margin-left: 10px;
  background-color: #ff6059;
}

.terminal__button--minimise {
  background-color: #ffbd2e;
}

.terminal__button--maximise {
  background-color: #29ca42;
}

.terminal__body {
  padding: 0 10px;
}

.terminal__code {
  text-align: center;
}

.terminal__code-language {
  display: block;
  color: #fff;
  line-height: 2rem;
  text-align: left;
}

.terminal__commands-list {
  list-style: none;
}

.terminal__commands-list .terminal__command--input:last-child::after {
  content: "\25A0"; /* Unicode code point for a block symbol */
  font-size: 14px;
  vertical-align: middle;
  animation: 1.2s fade infinite;
}


@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


</style>