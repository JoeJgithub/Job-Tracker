<script>
import { useDataStore, Statuses } from "../stores/data";
import JobItem from "./JobItem.vue";

export default {
  components: { JobItem },
  name: "JobsList",
  data() {
    return {
      statusFilter: "none",
      statuses: Object.values(Statuses),
      data_store: useDataStore(),
    };
  },
  methods: {
    onSelectStatusChanged: function () {
      this.data_store.clearJobFilters();
      this.data_store.addJobFilter("status", this.statusFilter);
    },
    orderByDate: function (order) {
      this.data_store.setJobSort("created", order);
    },
  },
  computed: {
    sortedAndFilteredJobs() {
      let output = [...this.data_store.allJobs];
      this.data_store.jobFilters.forEach((f) => {
        output = output.filter((j) => j[f.prop].includes(f.value));
      });
      if (this.data_store.jobSort.order === "asc") {
        output.sort((a, b) =>
          a[this.data_store.jobSort.prop] > b[this.data_store.jobSort.prop]
            ? 1
            : -1
        );
      } else {
        output.sort((a, b) =>
          a[this.data_store.jobSort.prop] < b[this.data_store.jobSort.prop]
            ? 1
            : -1
        );
      }
      console.log("Sorted output:", output);
      return output;
    },
  },
};
</script>

<template>
  <div class="filter-panel">
    <div class="filter-box">
      <label class="filter-sort-lbl">Status Filter: </label>
      <select
        class="selectbox"
        v-model="statusFilter"
        @change="onSelectStatusChanged()"
      >
        <option>none</option>
        <option v-for="status in statuses" :key="status">{{ status }}</option>
      </select>
    </div>
    <div class="sort-box">
      <label class="filter-sort-lbl">Sort By Date: </label>
      <button class="filter-btn" @click="orderByDate('asc')">Date asc</button>
      <button class="filter-btn" @click="orderByDate('desc')">Date desc</button>
    </div>
  </div>
  <div class="jobswrapper">
    <JobItem
      v-for="job in sortedAndFilteredJobs"
      :key="job.jobId"
      :jobdata="job"
    />
  </div>
</template>

<style scoped>
label {
  font-weight: bold;
}
.jobswrapper {
  display: flex;
  place-items: center;
  flex-direction: column;
  width: 100%;
}
.filter-btn {
  padding: 3px;
  width: 80px;
  font-weight: bold;
  margin: 5px;
}
.selectbox {
  border-radius: 2.5px;
  background-color: rgba(255, 255, 255, 0.5);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 5px;
  padding: 2.5px;
}
.filter-sort-lbl {
  font-size: 11pt;
}
.filter-box {
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: aliceblue;
}
.sort-box {
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: aliceblue;
}
</style>
