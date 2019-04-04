import { expect } from "chai";
import { mount } from "@vue/test-utils";
import App from "./../../src/App.vue";
import EditingNote from "./../../src/components/editing-note.vue";
import RegularNote from "./../../src/components/regular-note.vue";

describe("App.vue", () => {
  const wrapper = mount(App, {
    stubs: {
      "editing-note-component": EditingNote,
      "regular-note-component": RegularNote
    }
  });
  it("renders add-New-Note-Form", () => {
    expect(wrapper.find(".add_new_note_form").exists()).to.be.true;
  });
  it("no notes exist at the start", () => {
    expect(wrapper.find(".note_container_div").exists()).to.be.false;
  });
  it("adds a new Note", () => {
    wrapper.find("input").setValue("This is first note");
    wrapper.find(".add_new_note_form").trigger("submit.prevent");
    expect(wrapper.find(".note_container_div").exists()).to.be.true;
    expect(wrapper.findAll(".note_container_div").length).to.equal(1);
    expect(wrapper.find(".regular_note").exists()).to.be.true;
    // CHECK THIS BELOW ASSERTION ABOUT THE TEXT OF THE NOTE
    expect(wrapper.find(".regular_note").text()).to.include(
      "This is first note"
    );
  });
  it("triggers initiateEditNote event", () => {
    // expect(wrapper.find(".regular_note").exists()).to.be.true;
    // console.log("wrapper.vm.notesArr[0].id", wrapper.vm.notesArr[0].id);
    let noteId = wrapper.vm.notesArr[0].id;
    wrapper.find(RegularNote).vm.$emit("initiateEditNote", noteId);
    // wrapper.vm.$emit(, wrapper.vm.editNote(noteId));
    // console.log(wrapper.emitted().initiateEditNote[0]);
    // // expect(wrapper.emitted().foo.length).toBe(2)
  });

  it("shows the editing mode for the note and hides regular note", () => {
    expect(wrapper.find(".editing_note").exists()).to.be.true;
    expect(wrapper.find(".regular_note").exists()).to.be.false;
  });

  it("cancels the editing mode", () => {
    // console.log(wrapper.vm);
    wrapper.find(EditingNote).vm.$emit("initiateCancel");
    expect(wrapper.find(".regular_note").exists()).to.be.true;
  });

  it("allows editing of the note and then saving it", () => {
    let noteId = wrapper.vm.notesArr[0].id;
    wrapper.find(RegularNote).vm.$emit("initiateEditNote", noteId);
    wrapper
      .find(EditingNote)
      .vm.$emit("update:noteToEditText", "First note has been updated haha");
    wrapper.find(EditingNote).vm.$emit("initiateSave", noteId);
    expect(wrapper.find(".note_container_div").text()).to.include(
      "First note has been updated haha"
    );
  });

  it("deletes the note", () => {
    let noteId = wrapper.vm.notesArr[0].id;
    wrapper.find(RegularNote).vm.$emit("initiateDeleteNote", noteId);
    expect(wrapper.find(".note_container_div").exists()).to.be.false;
    expect(wrapper.vm.notesArr.length).to.equal(0);
  });
});
