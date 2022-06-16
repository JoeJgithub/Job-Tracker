<script>
import { useDataStore, Statuses } from "../stores/data";
import JobPopup from "./JobPopup.vue";
import { ref } from "vue";

export default {
  components: { JobPopup },
  name: "JobItem",
  props: ["jobdata"],
  data() {
    return {
      jobStatus: this.jobdata.status,
      statuses: Object.values(Statuses),
      data_store: useDataStore(),
      notesTrigger: ref(false),
    };
  },
  methods: {
    onSelectChanged: function () {
      this.data_store.setJobStatus(this.jobdata.jobId, this.jobStatus);
      console.log(this.data_store.allJobs);
    },
    toggleNotes: function () {
      console.log("Toggle note:", !this.notesTrigger);
      this.notesTrigger = !this.notesTrigger;
    },
  },
  created() {
    // console.log(this.jobStatus);
  },
};
</script>

<template>
  <div class="job">
    <button id="notes-btn" @click="toggleNotes()">Notes</button>
    <div class="jobdetail">{{ "Job: " + jobdata.jobId }}</div>
    <div class="jobdetail">
      {{ "Started: " + jobdata.created.toLocaleString() }}
    </div>
    <div class="jobdetail">{{ "Client: " + jobdata.clientFullName }}</div>
    <div class="jobdetail">{{ "Mobile: " + jobdata.clientMobile }}</div>
    <div class="jobdetail">{{ "Email: " + jobdata.clientEmail }}</div>
    <div class="jobdetail">
      {{ "Status: " }}
      <select class="selectbox" v-model="jobStatus" @change="onSelectChanged()">
        <option v-for="status in statuses" :key="status">{{ status }}</option>
      </select>
    </div>
  </div>
  <JobPopup
    v-if="notesTrigger"
    :ToggleNotes="() => toggleNotes()"
    :selectedJobId="jobdata.jobId"
  ></JobPopup>
</template>

<style scoped>
.selectbox {
  border-radius: 2.5px;
  background-color: rgba(255, 255, 255, 0.5);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.job {
  font-size: 10pt;
  padding: 10px 5px 10px 5px;
  margin: 7.5px;
  background-color: white;
  width: calc(95% - 15px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}
.job:hover {
  transition-delay: 0.05s;
  transition: 0.3s ease;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
  width: calc(95% - 10px);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.jobdetail {
  font-weight: 1000;
  display: inline-block;
  border: solid 0.5px #e693ff;
  background-color: #f2d1fc;
  border-radius: 15px;
  margin: 2px 5px 2px 5px;
  padding: 5px 7.5px 5px 7.5px;
}
#notes-btn {
  background-color: #c8ebff;
  border-radius: 5px;
  margin-right: 5px;
  font-weight: 700;
  font-size: 12.5pt;
}
#notes-btn:hover {
  background-color: #cecece;
  border-radius: 5px;
  margin-right: 5px;
}
</style>
