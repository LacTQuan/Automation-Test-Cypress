const HOST = "http://192.168.0.101:3000/";

describe("Appointment creation", (title, description, from, to, date, location, attendees) => {
  const taskCreationVisit = () => {
    cy.visit(HOST + "chat");
    cy.get('a[href^="/chat/group/"]').first().click();
    cy.contains("Cuộc trò chuyện chung").click();
    cy.get('button[aria-label="Tạo lịch hẹn"]').click();

    // Fill the task title
    cy.contains("label", "Tiêu đề").parent().find("input").type(title);

    // Fill the task description
    cy.contains("label", "Mô tả").parent().find("input").type(description);

    // Fill the due date
    cy.get('input[name="date"]').type(date);

    // From
    cy.contains("label", "Từ").click();

    cy.get(".MuiPickersToolbar-content").within(() => {
      const ampm = from.split(" ")[1];
      cy.contains(ampm).realClick();
    });

    cy.get(".MuiClock-clock").within(() => {
      const hour = from.split(":")[0];
      const minute = from.split(":")[1].split(" ")[0];
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

    // To
    cy.contains("label", "Đến").click();

    cy.get(".MuiPickersToolbar-content").within(() => {
      const ampm = to.split(" ")[1];
      cy.contains(ampm).realClick();
    });

    cy.get(".MuiClock-clock").within(() => {
      const hour = to.split(":")[0];
      const minute = to.split(":")[1].split(" ")[0];
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

    // Fill the location
    cy.contains("label", "Địa điểm").parent().find("input").type(location);

    // Clear the input field
    cy.contains("label", "Người tham dự")
      .parent()
      .should("be.visible")
      .find("input")
      .click();

    cy.contains("label", "Người tham dự")
      .parent()
      .find('button[aria-label="Xóa hết"]')
      .should("be.visible")
      .click();

    // Assign the task to the attendees
    for (let i = 0; i < attendees.length; i++) {
      cy.contains(attendees[i]).click();

      if (i < attendees.length - 1) {
        cy.contains("label", "Người tham dự").parent().find("input").click();
      }
    }
  };

  it("Create Valid Appointment", () => {
    cy.userLogin();
    taskCreationVisit(
      ((title = "Test"),
      (description = "Desc"),
      (from = "11:59 AM"),
      (to = "11:59 PM"),
      (date = "12/08/2024"),
      (location = "Hanoi"),
      (attendees = ["Quan"]))
    );
  });
});
