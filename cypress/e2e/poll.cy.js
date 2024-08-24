import * as utils from "../utils";

const HOST = Cypress.env("HOST");

describe("Poll creation", () => {
  const pollCreationVisit = (
    title,
    choices,
    due,
    singleSelect = false,
    submit = true
  ) => {
    cy.visit(HOST + "chat");
    cy.get('a[href^="/chat/group/"]').first().click();
    cy.contains("Cuộc trò chuyện chung").click();
    cy.get('button[aria-label="Tạo bình chọn"]').click();

    // Fill the poll title
    if (title !== "") {
      cy.contains("label", "Câu hỏi bình chọn")
        .parent()
        .find("input")
        .type(title);
    }

    // Fill the poll choices
    if (choices.length > 2) {
      const cnt = choices.length - 2;
      for (let i = 0; i < cnt; i++) {
        cy.get('button[aria-label="Thêm lựa chọn"]').click();
      }
    }

    for (let i = 0; i < choices.length; i++) {
      const title = "Lựa chọn " + (i + 1);
      cy.contains("label", title).parent().find("input").type(choices[i]);
    }

    if (singleSelect) {
      cy.contains("p", "Chọn nhiều phương án")
        .parent()
        .within(() => {
          cy.get(".MuiButtonBase-root").realClick();
        });
    }

    // Fill the poll end date
    if (due !== "") {
      cy.get('input[placeholder="Không có thời hạn"]').type(due); // 31/08/2024 23:59
    }

    if (submit) {
      cy.get('button[type="submit"]').click();
    }
  };

  // 01
  it("Create Valid Poll with Two Options and a Future End Date", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      utils.getPollChoices(3),
      utils.getDateTimeString(0, 0, 5),
    );

    cy.contains("Tạo bình chọn thành công").should("be.visible");
  });

  // 02
  it("Create Single Selection Poll", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      utils.getPollChoices(3),
      utils.getDateTimeString(0, 0, 5),
      true
    );

    cy.contains("Tạo bình chọn thành công").should("be.visible");
  });

  // 03
  it("Create Valid Poll with No Time Limit", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      utils.getPollChoices(3),
      ""
    );

    cy.contains("Tạo bình chọn thành công").should("be.visible");
  });

  // 04
  it("Create Valid Poll with No Time Limit and Single Selection", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      utils.getPollChoices(3),
      "",
      true
    );

    cy.contains("Tạo bình chọn thành công").should("be.visible");
  });

  // 05
  it("Create Poll Without Question", () => {
    cy.userLogin();
    pollCreationVisit(
      "",
      utils.getPollChoices(3),
      utils.getDateTimeString(0, 0, 5)
    );

    cy.contains("Vui lòng nhập câu hỏi cần bình chọn").should("be.visible");
  });

  // 06
  it("Create Single Selection Poll Without Question", () => {
    cy.userLogin();
    pollCreationVisit(
      "",
      utils.getPollChoices(3),
      utils.getDateTimeString(0, 0, 5),
      true
    );

    cy.contains("Vui lòng nhập câu hỏi cần bình chọn").should("be.visible");
  });

  // 07
  it("Create Poll with No Time Limit Without Question", () => {
    cy.userLogin();
    pollCreationVisit(
      "",
      utils.getPollChoices(3),
      ""
    );

    cy.contains("Vui lòng nhập câu hỏi cần bình chọn").should("be.visible");
  });

  // 08
  it("Create Poll with No Time Limit and Single Selection Without Question", () => {
    cy.userLogin();
    pollCreationVisit(
      "",
      utils.getPollChoices(3),
      "",
      true
    );

    cy.contains("Vui lòng nhập câu hỏi cần bình chọn").should("be.visible");
  });

  // 09
  it("Create Poll with Future End Date and without Choice Options", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      [],
      utils.getDateTimeString(0, 0, 5)
    );

    cy.contains("Không được để trống bình chọn").should("be.visible");
  });

  // 10
  it("Create Single Selection Poll Without Choice Options", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      [],
      utils.getDateTimeString(0, 0, 5),
      true
    );

    cy.contains("Không được để trống bình chọn").should("be.visible");
  });

  // 11
  it("Create Poll with No Time Limit and without Choice Options", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      [],
      ""
    );

    cy.contains("Không được để trống bình chọn").should("be.visible");
  });

  // 12
  it("Create Single Selection Poll with No Time Limit and without Choice Options", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      [],
      "",
      true
    );

    cy.contains("Không được để trống bình chọn").should("be.visible");
  });

  // 13
  it("Create Poll with Two Options and a Past End Date", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      utils.getPollChoices(2),
      utils.getDateTimeString(0, 0, -5)
    );

    cy.contains("Thời hạn phải luôn lớn hơn thời điểm hiện tại").should("be.visible");
  });

  // 14
  it("Create Single Selection Poll with Past End Date", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      utils.getPollChoices(2),
      utils.getDateTimeString(0, 0, -5),
      true
    );

    cy.contains("Thời hạn phải luôn lớn hơn thời điểm hiện tại").should("be.visible");
  });

  // 15
  it("Create Valid Poll With Valid Boundary Value of End Date", () => {
    cy.userLogin();
    pollCreationVisit(
      utils.getPollTitle(),
      utils.getPollChoices(2),
      utils.getDateTimeString(0, 0, 1),
      true
    );

    cy.contains("Tạo bình chọn thành công").should("be.visible");
  });

  // // 16
  // it("Create Poll with Invalid Lower Boundary Value of End Date", () => {
  //   cy.userLogin();
  //   pollCreationVisit(
  //     utils.getPollTitle(),
  //     utils.getPollChoices(2),
  //     utils.getDateTimeString(0, 0, -1),
  //     true
  //   );

  //   cy.contains("Thời hạn phải luôn lớn hơn thời điểm hiện tại").should("be.visible");
  // });

  // // 17
  // it("Create Poll with Invalid Boundary Value of End Date", () => {
  //   cy.userLogin();
  //   pollCreationVisit(
  //     utils.getPollTitle(),
  //     utils.getPollChoices(2),
  //     utils.getDateTimeString(0, 0, 0),
  //     true
  //   );

  //   cy.contains("Thời hạn phải luôn lớn hơn thời điểm hiện tại").should("be.visible");
  // });
});
