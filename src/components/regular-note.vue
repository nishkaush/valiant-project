<template>
  <div class="note">
    <span class="noteText" @click="initiateEditNote(note.id)">{{note.text}}</span>
    <i class="material-icons delete" @click="initiateDeleteNote(note.id)">done</i>
  </div>
</template>


<script>
export default {
  props: ["note"],
  methods: {
    initiateEditNote(noteId) {
      this.$emit("initiateEditNote", noteId);
    },
    initiateDeleteNote(noteId) {
      this.$emit("initiateDeleteNote", noteId);
    }
  }
};
</script>
