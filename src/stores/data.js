import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const Statuses = {
  Scheduled: "scheduled",
  Active: "active",
  Invoicing: "invoicing",
  ToPriced: "to priced",
  Completed: "completed",
};

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      allJobs: [
        {
          jobId: 1,
          status: Statuses.Completed,
          created: new Date("June 13, 2022 09:50:00"),
          clientFullName: "Tony Harris",
          clientMobile: "022 139 9119",
          clientEmail: "tonyharris@gmail.com",
        },
        {
          jobId: 2,
          status: Statuses.Invoicing,
          created: new Date("June 14, 2022 08:00:00"),
          clientFullName: "John Smith",
          clientMobile: "022 139 9119",
          clientEmail: "johnsmith@gmail.com",
        },
        {
          jobId: 3,
          status: Statuses.Active,
          created: new Date("June 15, 2022 19:15:00"),
          clientFullName: "Sally Harris",
          clientMobile: "022 139 9119",
          clientEmail: "sallyharris@yahoo.com",
        },
        {
          jobId: 4,
          status: Statuses.Scheduled,
          created: new Date("June 15, 2022 19:30:00"),
          clientFullName: "Terry Jones",
          clientMobile: "022 139 9119",
          clientEmail: "terryjones@gmail.com",
        },
      ],
      allNotes: [
        {
          id: uuid(),
          jobId: 1,
          created: new Date("June 13, 2022 09:55:00"),
          text: "Take measurement of bedroom.",
        },
        {
          id: uuid(),
          jobId: 2,
          created: new Date("June 14, 2022 08:15:00"),
          text: "Take measurement of garage.",
        },
        {
          id: uuid(),
          jobId: 3,
          created: new Date("June 15, 2022 19:20:00"),
          text: "Take measurement of bathroom.",
        },
        {
          id: uuid(),
          jobId: 4,
          created: new Date("June 15, 2022 19:45:00"),
          text: "Take measurement of kitchen.\nand shower\nand bath",
        },
      ],
      jobFilters: [],
      jobSort: { prop: "created", order: "desc" },
    };
  },
  actions: {
    setJobStatus(jobid, newstatus) {
      const idx = this.allJobs.findIndex((n) => n.jobId == jobid);
      this.allJobs[idx].status = newstatus;
    },
    clearJobFilters() {
      while (this.jobFilters.length) {
        this.jobFilters.pop();
      }
    },
    addJobFilter(filterby, filtervalue) {
      if (filtervalue !== "none")
        this.jobFilters.push({ prop: filterby, value: filtervalue });
    },
    setJobSort(sortby, direction) {
      this.jobSort = { prop: sortby, order: direction };
    },
    addNote(jobid, content) {
      this.allNotes.push({
        id: uuid(),
        jobId: jobid,
        created: new Date(),
        text: content,
      });
    },
    editNote(noteid, newtext) {
      const idx = this.allNotes.findIndex((n) => n.noteId == noteid);
      this.allNotes[idx].text = newtext;
    },
  },
  getters: {
    sortedAndFilteredJobs(state) {
      let output = [...state.allJobs];
      this.jobFilters.forEach((f) => {
        output = output.filter((j) => j[f.prop].includes(f.value));
      });
      if (this.jobSort.order === "asc") {
        output.sort((a, b) =>
          a[this.jobSort.prop] > b[this.jobSort.prop] ? 1 : -1
        );
      } else {
        output.sort((a, b) =>
          a[this.jobSort.prop] < b[this.jobSort.prop] ? 1 : -1
        );
      }
      console.log("Sorted output:", output);
      return output;
    },
  },
});
