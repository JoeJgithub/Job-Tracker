<script>
import { useDataStore } from "../stores/data";

export default {
  name: "JobPopup",
  props: ["ToggleNotes", "selectedJobId"],
  data() {
    return {
      data_store: useDataStore(),
    };
  },
  methods: {
    scrollToBottom() {
      const container = this.$refs.notesContainer;
      setTimeout(function () {
        container.scrollTop = container.scrollHeight - 200;
      }, 100);
    },
  },
  computed: {
    filteredNotes() {
      return this.data_store.allNotes.filter(
        (n) => n.jobId == this.selectedJobId
      );
    },
  },
};
</script>

<template>
  <div class="job-popup">
    <div class="jobpopup-inner" ref="notesContainer">
      <div class="note" v-for="note in filteredNotes" :key="note.noteId">
        <div class="note-created">
          Created at: {{ note.created.toLocaleString() }}
        </div>
        <textarea class="notecontent" v-model="note.text" @value="note.text" />
      </div>
    </div>
    <div class="btns">
      <button
        class="job-popup-btn"
        id="job-popup-add"
        @click="data_store.addNote(selectedJobId, ''), scrollToBottom()"
      >
        Add
      </button>
      <button class="job-popup-btn" id="job-popup-close" @click="ToggleNotes()">
        Close
      </button>
    </div>
  </div>
</template>

<style scoped>
.job-popup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  min-height: 100%;
  width: 100%;
  background-color: rgba(46, 46, 46, 0.75);
}
.jobpopup-inner {
  text-align: center;
  background-color: white;
  padding: 20px;
  display: flex;
  place-items: center;
  flex-direction: column;
  width: 100%;
  min-height: calc(50vh);
  max-height: calc(80vh);
  max-width: 1180px;
  margin: 40px;
  overflow: scroll;
  overflow-x: hidden;
}
.note {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
}
.notecontent {
  padding: 5px;
  width: calc(100% - 10px);
  resize: vertical;
  height: 85px;
  border-radius: 5px;
  background-color: rgb(242, 248, 255);
}
.btns {
  display: flex;
  place-items: center;
  flex-direction: column;
}
.job-popup-btn {
  border-radius: 5px;
  font-weight: bold;
  padding: 5px;
  margin: 5px;
  width: 100px;
}
#job-popup-add {
  float: left;
  background-color: rgb(80, 212, 80);
}
#job-popup-close {
  float: right;
  background-color: rgb(255, 82, 82);
}
.note-created {
  font-size: 10pt;
  font-weight: 600;
  text-align: left;
  margin-bottom: 3px;
}
</style>
