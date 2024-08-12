import * as utils from "../utils/dateTime";

const HOST = Cypress.env("HOST");

describe("Appointment creation", (title, description, from, to, date, location, attendees, submit = true) => {
  const taskCreationVisit = () => {
    cy.visit(HOST + "chat");
    cy.get('a[href^="/chat/group/"]').first().click();
    cy.contains("Cuộc trò chuyện chung").click();
    cy.get('button[aria-label="Tạo lịch hẹn"]').click();

    // Fill the task title
    if (title !== "") {
      cy.contains("label", "Tiêu đề").parent().find("input").type(title);
    }

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

    cy.get(".MuiClock-root").within(() => {
      const hour = from.split(":")[0];
      const minute = from.split(":")[1].split(" ")[0];
      cy.contains(hour).realClick();

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
    });
    cy.contains("button", "OK").click();

    // To
    cy.contains("label", "Đến").click();

    cy.get(".MuiPickersToolbar-content").within(() => {
      const ampm = to.split(" ")[1];
      cy.contains(ampm).realClick();
    });

    cy.get(".MuiClock-root").within(() => {
      const hour = to.split(":")[0];
      const minute = to.split(":")[1].split(" ")[0];
      cy.contains(hour).realClick();

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

    cy.get("button.MuiAutocomplete-popupIndicator").click();

    if (attendees.length > 0) {
      // Assign the task to the attendees
      for (let i = 0; i < attendees.length; i++) {
        cy.contains("label", "Người tham dự").parent().find("input").click();
        cy.contains(attendees[i]).click();
      }
    }

    if (submit) {
      cy.contains("button", "Lưu lịch hẹn").click();
    }
  };

  // 01
  // it("Create Valid Appointment", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = utils.getTimeString(1, 0)),
  //     (to = utils.getTimeString(1, 10)),
  //     (date = utils.getDateString(1)),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]))
  //   );

  //   cy.contains("Tạo lịch hẹn thành công").should("be.visible");
  // });

  // 02
  // it("Create Invalid Appointment without Title", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = ""),
  //     (description = "Meeting date"),
  //     (from = utils.getTimeString(1, 0)),
  //     (to = utils.getTimeString(1, 10)),
  //     (date = utils.getDateString(1)),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]))
  //   );

  //   cy.contains("Vui lòng nhập tiêu đề").should("be.visible");
  // });

  // 03
  // it("Create Invalid Appointment with All Fields Filled and Past Start Time", () => {
  //   cy.userLogin();
  //   const startTime = utils.getTimeString(-1, 0);
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = startTime),
  //     (to = utils.getTimeString(1, 10)),
  //     (date = utils.getDateString(1)),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]),
  //     (submit = false))
  //   );

  //     cy.get('input[name="timeStart"]').then(($input) => {
  //       const date = $input.val();
  //       // the value of the input field should not be the same as the time
  //       expect(date).not.to.eq(startTime);
  //     });
  // });

  // 04
  // it("Create Invalid Appointment with All Fields Filled and the End Time before Start Time", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = utils.getTimeString(1, 2)),
  //     (to = utils.getTimeString(1, 1)),
  //     (date = utils.getDateString(1)),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]))
  //   );

  //   cy.contains("Giờ kết thúc phải luôn lớn hơn giờ bắt đầu").should("be.visible");
  // });

  // 05
  // it("Create Invalid Appointment with All Fields Filled and Past Start Date", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = utils.getTimeString(1, 1)),
  //     (to = utils.getTimeString(1, 2)),
  //     (date = utils.getDateString(-1)),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]))
  //   );

  //   cy.contains("Ngày hẹn phải lớn hơn hoặc bằng ngày hiện tại").should("be.visible");
  // });

  // 06
  // it("Create Invalid Appointment with No Selected Attendees", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = utils.getTimeString(1, 1)),
  //     (to = utils.getTimeString(1, 2)),
  //     (date = utils.getDateString(1)),
  //     (location = "HCMUS"),
  //     (attendees = []))
  //   );

  //   cy.contains("Vui lòng chọn người tham gia lịch hẹn").should("be.visible");
  // });

  // 07
  // it("Create Valid Appointment with All Fields Filled and Upper Boundary Value of Start Time", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = utils.getTimeString(1, 1)),
  //     (to = utils.getTimeString(1, 10)),
  //     (date = utils.getDateString()),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]))
  //   );

  //   cy.contains("Tạo lịch hẹn thành công").should("be.visible");
  // });

  // 08
  // it("Create Valid Appointment with All Fields Filled and Minimum Duration", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = utils.getTimeString(1, 1)),
  //     (to = utils.getTimeString(1, 2)),
  //     (date = utils.getDateString()),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]))
  //   );

  //   cy.contains("Tạo lịch hẹn thành công").should("be.visible");
  // });

  // 09
  // it("Create Valid Appointment with All Fields Filled and Minimum Valid Date", () => {
  //   cy.userLogin();
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = utils.getTimeString(1, 1)),
  //     (to = utils.getTimeString(1, 2)),
  //     (date = utils.getDateString()),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]))
  //   );

  //   cy.contains("Tạo lịch hẹn thành công").should("be.visible");
  // });

  // 10
  // it("Create Invalid Appointment with All Fields Filled and Maximum Invalid Start time", () => {
  //   cy.userLogin();
  //   const startTime = utils.getTimeString(0, 0);
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = startTime),
  //     (to = utils.getTimeString(0, 2)),
  //     (date = utils.getDateString()),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]),
  //     (submit = false))
  //   );

  //   cy.get('input[name="timeStart"]').then(($input) => {
  //     const date = $input.val();
  //     // the value of the input field should not be the same as the time
  //     expect(date).not.to.eq(startTime);
  //   });
  // });

  // 11
  // it("Create Invalid Appointment with All Fields Filled and Lower Boundary Value of Start time", () => {
  //   cy.userLogin();
  //   const startTime = utils.getTimeString(0, -1);
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = startTime),
  //     (to = utils.getTimeString(0, 2)),
  //     (date = utils.getDateString()),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]),
  //     (submit = false))
  //   );

  //   cy.get('input[name="timeStart"]').then(($input) => {
  //     const date = $input.val();
  //     // the value of the input field should not be the same as the time
  //     expect(date).not.to.eq(startTime);
  //   });
  // });

  // 12
  // it("Create Invalid Appointment with All Fields Filled and Start time equals to End time", () => {
  //   cy.userLogin();
  //   const startTime = utils.getTimeString(0, 1);
  //   taskCreationVisit(
  //     ((title = "Meeting date"),
  //     (description = "Meeting date"),
  //     (from = startTime),
  //     (to = utils.getTimeString(0, 1)),
  //     (date = utils.getDateString()),
  //     (location = "HCMUS"),
  //     (attendees = ["Quan"]),
  //     (submit = false))
  //   );

  //     cy.get('input[name="timeStart"]').then(($start) => {
  //       const startDate = $start.val();
  //       // the value of the input field should not be the same as the time
  //       cy.get('input[name="timeEnd"]').then(($end) => {
  //         const endDate = $end.val();
  //         // the value of the input field should not be the same as the time
  //         expect(startDate).not.to.eq(endDate);
  //       });
  //     });
  // });

  // 13
  it("Create Invalid Appointment with All Fields Filled and Start time after End time", () => {
    cy.userLogin();
    taskCreationVisit(
      ((title = "Meeting date"),
      (description = "Meeting date"),
      (from = utils.getTimeString(0, 2)),
      (to = utils.getTimeString(0, 1)),
      (date = utils.getDateString()),
      (location = "HCMUS"),
      (attendees = ["Quan"]),
      (submit = false))
    );

    cy.get('input[name="timeStart"]').then(($start) => {
      const startDate = $start.val();
      // the value of the input field should not be the same as the time
      cy.get('input[name="timeEnd"]').then(($end) => {
        const endDate = $end.val();
        // the value of the input field should not be the same as the time
        expect(utils.parseTimeString(startDate)).not.to.greaterThan(utils.parseTimeString(endDate));
      });
    });
  });
});
