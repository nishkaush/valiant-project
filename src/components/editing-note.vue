<template>
  <div class="editing_note">
    <input type="text" v-model="noteEdited">
    <i @click="initiateSave(note.id)" class="material-icons save">save</i>
    <i @click="initiateCancel" class="material-icons cancel">clear</i>
  </div>
</template>


<script>
export default {
  props: ["note", "noteToEditText"],
  data() {
    return {
      noteEdited: ""
    };
  },
  methods: {
    initiateSave(noteId) {
      this.$emit("initiateSave", noteId);
    },
    initiateCancel() {
      this.$emit("initiateCancel");
    }
  },
  watch: {
    noteEdited(val) {
      this.$emit("update:noteToEditText", val);
    }
  },
  created() {
    this.noteEdited = this.noteToEditText;
  }
};
</script>


<style>
.editing_note {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 1% 2%;
}

.material-icons {
  margin: auto 1%;
  font-size: 30px;
  cursor: pointer;
}
.material-icons.delete {
  color: rgb(11, 235, 11);
}
</style>
