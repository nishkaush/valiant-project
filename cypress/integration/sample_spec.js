describe("some shit should happen", function() {
  it("visits the localhost page on 8080", function() {
    cy.visit("/");
  });

  let notesArr = [
    { text: "wowwoow", status: false, id: 111111 },
    { text: "lololol", status: false, id: 222222 },
    { text: "wtfwtfwtf", status: false, id: 4444444 }
  ];

  notesArr.forEach(e => {
    it("types a new note and then adds it", function() {
      cy.get(".add_new_note_form input").type(`${e.text} {enter}`);
      // cy.get(".add_new_note_btn").click();
      cy.get(".regular_note .noteText").contains(e.text);
    });
  });

  it("edits the note and updates it", function() {
    cy.contains(notesArr[1].text).click();
    cy.get(".editing_note input")
      .clear()
      .type("I am loving cyprus");
    cy.get(".material-icons.save").click();
  });

  it("initiates editing but then cancels the editing process", function() {
    cy.contains(notesArr[2].text).click();
    cy.get(".editing_note .material-icons.cancel").click();
  });

  it("deletes the note", function() {
    cy.contains(notesArr[2].text)
      .next()
      .click();
  });
});
