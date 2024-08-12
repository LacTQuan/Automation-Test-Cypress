import * as utils from "../utils/dateTime";

const HOST = Cypress.env("HOST");

describe("Task creation", (title, description, dueTime, dueDate, assignees, submit = true) => {
  const taskCreationVisit = () => {
    let exit = false;

    cy.visit(HOST + "chat");
    cy.get('a[href^="/chat/group/"]').first().click();
    cy.contains("Cuộc trò chuyện chung").click();
    cy.get('button[aria-label="Tạo công việc"]').click();

    // Fill the task title
    if (title !== "") {
      cy.contains("label", "Tiêu đề").parent().find("input").type(title);
    }

    // Fill the task description
    cy.contains("label", "Mô tả").parent().find("input").type(description);

    // Fill the due date
    cy.get('input[name="date"]').type(dueDate);

    // Fill the due time
    cy.contains("label", "Tới hạn lúc").click();

    cy.get(".MuiPickersToolbar-content").within(() => {
      const ampm = dueTime.split(" ")[1];
      cy.contains(ampm).realClick();
    });

    cy.get(".MuiTimeClock-root").within(() => {
      const hour = dueTime.split(":")[0];
      const minute = dueTime.split(":")[1].split(" ")[0];
      cy.contains(hour).realClick();

      // Check if the current screen is the minute screen
      cy.get(".MuiTimeClock-arrowSwitcher")
        .children()
        .first()
        .then((el) => {
          // if the element class contains "Mui-disabled", then the current screen is the hour screen --> skip all the steps below
          if (el.hasClass("Mui-disabled")) {
            exit = true;
          } else {
            let intMinute = parseInt(minute);
            cy.get(".MuiClock-clock").then(($el) => {
              const rect = $el[0].getBoundingClientRect();
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
        
              const radius = rect.width / 2 - 5;
        
              const angle = 6 * intMinute; // Each minute represents 6 degrees
              const angleInRadians = (Math.PI / 180) * angle;
        
              const x = centerX + radius * Math.sin(angleInRadians);
              const y = centerY - radius * Math.cos(angleInRadians);
        
              cy.get(".MuiClock-clock").realClick({ position: { x, y } });
            });
          }
        });
    });

    if (!exit) {
      cy.contains("button", "OK").click();

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

      cy.get("button.MuiAutocomplete-popupIndicator").click();

      if (assignees.length > 0) {
        // Assign the task to the assignees
        for (let i = 0; i < assignees.length; i++) {
          cy.contains("label", "Giao công việc").parent().find("input").click();

          cy.contains(assignees[i]).click();
        }
      }
      if (submit) {
        cy.contains("button", "Lưu công việc").click();
      }
    }
  };

  // 01
  // it("Create Valid Task with All Fields Filled", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Setup project"),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = utils.getTimeString(2)),
  //     (dueDate = utils.getDateString(2)),
  //     (assignees = ["Quan", "Harry Potter"]))
  //   );

  //   cy.contains("Lưu công việc thành công").should("be.visible");
  // });

  // 02
  // it("Create Invalid Task with Deadline time before the current time", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Setup project"),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = utils.getTimeString(-1)),
  //     (dueDate = utils.getDateString()),
  //     (assignees = ["Quan", "Harry Potter"]))
  //   );

  //   cy.contains(getTimeString().split(":")[1].split(" ")[0]).should(
  //     "not.be.visible"
  //   );
  // });

  // 03
  // it("Create Invalid Task with Deadline date before the current date", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Setup project"),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = utils.getTimeString(2)),
  //     (dueDate = utils.getDateString(-1)),
  //     (assignees = ["Quan", "Harry Potter"]))
  //   );

  //   cy.contains("Ngày tới hạn phải lớn hơn hoặc bằng ngày hiện tại").should("be.visible");
  // });

  // 04
  // it("Create Invalid Task without title", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = ""),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = utils.getTimeString(2)),
  //     (dueDate = utils.getDateString(2)),
  //     (assignees = ["Quan", "Harry Potter"]))
  //   );

  //   cy.contains("Vui lòng nhập tiêu đề").should("be.visible");
  // })

  // 05
  // it("Create Invalid Task without assigned members", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Setup project"),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = utils.getTimeString(2)),
  //     (dueDate = utils.getDateString(2)),
  //     (assignees = []))
  //   );

  //   cy.contains("Vui lòng chọn người sẽ thực hiện công việc").should(
  //     "be.visible"
  //   );
  // });

  // 06
  // it("Create Valid Task with minimum valid deadline time", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Setup project"),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = utils.getTimeString(0, 1)),
  //     (dueDate = utils.getDateString(1)),
  //     (assignees = ["Quan", "Harry Potter"]))
  //   );

  //   cy.contains("Lưu công việc thành công").should(
  //     "be.visible"
  //   );
  // });

  // 07
  // it("Create Valid Task with minimum valid deadline date", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Setup project"),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = utils.getTimeString(0, 0)),
  //     (dueDate = utils.getDateString()),
  //     (assignees = ["Quan", "Harry Potter"]))
  //   );

  //   cy.contains("Lưu công việc thành công").should(
  //     "be.visible"
  //   );
  // });

  // 08
  // it("Create Invalid Task with maximum invalid deadline time", () => {
  //   const time = utils.getTimeString(0, -1);
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Setup project"),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = time),
  //     (dueDate = utils.getDateString()),
  //     (assignees = ["Quan", "Harry Potter"]),
  //     (submit = false))
  //   );

  //   // verify the input field value
  //   cy.get('input[name="deadline"]').then(($input) => {
  //     const date = $input.val();
  //     // the value of the input field should not be the same as the time
  //     expect(date).not.to.eq(time);
  //   });
  // });

  // 09
  // it("Create Invalid Task with maximum invalid deadline date", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Setup project"),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = utils.getTimeString()),
  //     (dueDate = utils.getDateString()),
  //     (assignees = ["Quan", "Harry Potter"]))
  //   );

  //   cy.contains("Ngày tới hạn phải lớn hơn hoặc bằng ngày hiện tại").should(
  //     "be.visible"
  //   );
  // });


  // 10
  // it("Create Invalid Task with maximum invalid deadline date", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Setup project"),
  //     (description = "Setup backend using Java Spring Boot"),
  //     (dueTime = utils.getTimeString()),
  //     (dueDate = utils.getDateString(-1)),
  //     (assignees = ["Quan", "Harry Potter"]))
  //   );

  //   cy.contains("Ngày tới hạn phải lớn hơn hoặc bằng ngày hiện tại").should(
  //     "be.visible"
  //   );
  // });
});

