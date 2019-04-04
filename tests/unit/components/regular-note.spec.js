import { mount } from "@vue/test-utils";
import { expect } from "chai";
import RegularNote from "./../../../src/components/regular-note.vue";

describe("Regular Note Component", () => {
  const wrapper = mount(RegularNote, {
    propsData: {
      note: { text: "haha lmao", id: 10000, status: false }
    }
  });
  it("renders the correct note text", () => {
    expect(wrapper.find(".noteText").text()).to.equal("haha lmao");
  });
  it("initiates edit mode when text of note is clicked", () => {
    wrapper.find(".noteText").trigger("click");
    expect(wrapper.emitted().initiateEditNote.length).to.equal(1);
  });
  it("initiates deletion of the note when material icon for delete is clicked", () => {
    wrapper.find(".material-icons.delete").trigger("click");
    expect(wrapper.emitted().initiateDeleteNote.length).to.equal(1);
  });
});
