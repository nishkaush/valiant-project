<template>
  <div id="app">
    <h1>Valiant Notes</h1>
    <small>( Click on any note's text to edit it )</small>
    <!-- Form for Adding new notes -->
    <form class="add_new_note_form" @submit.prevent="addNewNote">
      <input placeholder="Type new note" type="text" v-model="newNoteText">
      <button class="add_new_note_btn">Add</button>
    </form>

    <div class="note_container_div" v-for="note in allNotes" :key="note.id">
      <!-- shown normally for each Note -->
      <RegularNote
        class="regular_note"
        v-if="noteToEdit.id!==note.id"
        @initiateEditNote="editNote"
        :note="note"
        @initiateDeleteNote="deleteNote"
      />
      <!-- only shown when that Note goes into edit mode -->
      <EditingNote
        class="editing_note"
        v-if="showEditMode && noteToEdit.id===note.id"
        :note="note"
        :noteToEditText.sync="noteToEdit.text"
        @initiateSave="saveNote"
        @initiateCancel="cancelNoteEditing"
      />
    </div>
  </div>
</template>

<script>
import RegularNote from "./components/regular-note.vue";
import EditingNote from "./components/editing-note.vue";
export default {
  name: "app",
  data() {
    return {
      noteToEdit: {},
      showEditMode: false,
      newNoteText: "",
      notesArr: [
        // { id: 2323424200, text: "First Note", status: false }
      ]
    };
  },
  methods: {
    editNote(noteId) {
      let editableNote = this.notesArr.find(e => e.id === noteId);
      this.noteToEdit = { text: editableNote.text, id: editableNote.id };
      this.showEditMode = true;
      // console.log("ran edit mode);
    },
    saveNote(noteId) {
      let updatedObj = { ...this.noteToEdit, status: false };
      let indexOfNoteToUpdate = this.notesArr.findIndex(e => e.id === noteId);
      this.notesArr[indexOfNoteToUpdate] = updatedObj;
      this.cancelNoteEditing();
    },
    cancelNoteEditing() {
      this.showEditMode = false;
      this.noteToEdit = {};
    },
    addNewNote() {
      if (this.newNoteText) {
        let newNoteObj = {
          id: Date.now(),
          text: this.newNoteText,
          status: false
        };
        this.notesArr.push(newNoteObj);
        this.newNoteText = "";
      }
    },
    deleteNote(noteId) {
      this.notesArr = this.notesArr.filter(e => e.id !== noteId);
    }
  },
  computed: {
    allNotes() {
      return this.notesArr.sort((a, b) => b.id - a.id);
    }
  },
  components: {
    RegularNote,
    EditingNote
  }
};
</script>

<style>
body {
  background: #313131;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}

input {
  width: 60%;
  height: 35px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #dedede;
  color: white;
  font-size: 1em;
}
input:focus {
  outline: none;
}

.add_new_note_form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 0 auto;
}

.add_new_note_btn {
  width: 160px;
  height: 45px;
  background: blue;
  color: white;
  border: none;
  box-shadow: 1px 1px 1px 1px solid #323232;
  border-radius: 2px;
  margin: 2%;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
}
.add_new_note_btn:focus {
  outline: none;
}

.note_container_div {
  text-align: left;
  width: 50%;
  margin: 1% auto;
  font-size: 0.8em;
}

.material-icons {
  margin: auto 1%;
  font-size: 30px;
  cursor: pointer;
}
.material-icons.delete {
  color: rgb(11, 235, 11);
}

.note,
.editing_note {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 1% 2%;
}
.note {
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px #3f3f3f;
}
</style>
