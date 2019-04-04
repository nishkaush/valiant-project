import { expect } from "chai";
import { mount } from "@vue/test-utils";
import EditingNote from "./../../../src/components/editing-note.vue";

const wrapper = mount(EditingNote, {
  propsData: {
    note: { text: "haha hehe", id: 1234567, status: false },
    noteToEditText: "haha hehe"
  }
});

describe("Editing Note component", () => {
  it("initiates saving of the note by emitting an event to parent", () => {
    wrapper.find(".material-icons.save").trigger("click");
    expect(wrapper.emitted().initiateSave.length).to.equal(1);
  });

  it("initiates the cancelling of a note editing", () => {
    wrapper.find(".material-icons.cancel").trigger("click");
    expect(wrapper.emitted().initiateCancel).to.be.an("array");
    expect(wrapper.emitted().initiateCancel[0].length).to.equal(0);
  });

  it("emits an event to notify parent of the changed value of note text", () => {
    wrapper.find("input").setValue("lololol");
    expect(wrapper.emitted()["update:noteToEditText"]).to.be.an("array");
    // expect(wrapper.emitted()["update:noteToEditText"].length).to.equal(1);
    // wrapper.emitted() is equal to : {"update:noteToEditText":[["haha hehe"],["lololol"]]}
    // the reason first argument is empty because created hook makes the intial changes
    // this sets value to haha hehe
    // next i trigger the update in value which puts it at "lololol"
    expect(wrapper.emitted()["update:noteToEditText"][1][0]).to.equal(
      "lololol"
    );
  });
});
