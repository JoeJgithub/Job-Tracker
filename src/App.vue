<script setup>
import JobsList from "@/components/JobsList.vue";
</script>

<template>
  <header>
    <div class="heading">Jobs Tracker</div>
  </header>
  <div class="main">
    <div class="jobs-list">
      <JobsList />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  max-width: 1380px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
header {
  color: white;
  margin-bottom: 6px;
  background-color: #b4becc;
  border: rgb(65, 65, 65) solid 1px;
  /* border-radius: 8px 8px 0px 0px; */
  box-shadow: 7.5px 7.5px lightblue;
}
.heading {
  font-family: "Open Sans", "Helvetica Neue", sans-serif;
  margin-block-start: 0.2em;
  margin-block-end: 0.2em;
  font-size: 28pt;
  text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.2);
  /* text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */
  text-align: center;
}
.main {
  background-color: rgb(246, 242, 248);
  border: rgb(65, 65, 65) solid 1px;
  /* border-radius: 0px 0px 8px 8px; */
  height: fit-content;
  min-height: calc(100vh - 175px);
  box-shadow: 7.5px 7.5px lightblue;
}
.jobs-list {
  padding: 20px;
  display: flex;
  place-items: center;
  flex-direction: column;
}
</style>
