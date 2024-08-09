const HOST = "http://192.168.0.101:3000/";

describe("Task creation", (title, description, dueTime, dueDate, assignees) => {
  const taskCreationVisit = () => {
    cy.visit(HOST + "chat");
    cy.get('a[href^="/chat/group/"]').first().click();
    cy.contains("Cuộc trò chuyện chung").click();
    cy.get('button[aria-label="Tạo công việc"]').click();

    // Fill the task title
    cy.contains("label", "Tiêu đề").parent().find("input").type(title);

    // Fill the task description
    cy.contains("label", "Mô tả").parent().find("input").type(description);

    // Fill the due time
    cy.contains("label", "Tới hạn lúc").click();

    cy.get(".MuiPickersToolbar-content").within(() => {
      const ampm = dueTime.split(" ")[1];
      cy.contains(ampm).realClick();
    });

    cy.get(".MuiClock-clock").within(() => {
      const hour = dueTime.split(":")[0];
      const minute = dueTime.split(":")[1].split(" ")[0];
      cy.contains(hour).realClick();
      if (parseInt(minute) % 5 === 0) {
        cy.contains(minute).realClick();
      } else {
        if (minute == "01") {
          cy.get(".MuiClock-squareMask").realClick({ x: 115, y: 50 });
        } else if (minute == "59") {
          cy.get(".MuiClock-squareMask").realClick({ x: 105, y: 50 });
        }
      }
    });

    cy.contains("button", "OK").click();

    // Fill the due date
    cy.get('input[name="date"]').type(dueDate);

    // Clear the input field
    cy.contains("label", "Giao công việc")
      .parent()
      .should("be.visible")
      .find("input")
      .click();

    cy.contains("label", "Giao công việc")
      .parent()
      .find('button[aria-label="Xóa hết"]')
      .should("be.visible")
      .click();

    // Assign the task to the assignees
    for (let i = 0; i < assignees.length; i++) {
      cy.contains(assignees[i]).click();

      if (i < assignees.length - 1) {
        cy.contains("label", "Giao công việc").parent().find("input").click();
      }
    }
  };

  it("Create Valid Task", () => {
    cy.userLogin();
    taskCreationVisit(
      ((title = "Test"),
      (description = "Desc"),
      (dueTime = "11:59 PM"),
      (dueDate = "12/08/2024"),
      (assignees = ["Quan", "Harry Potter"]))
    );
  });
});
