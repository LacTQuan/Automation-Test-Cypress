const HOST = "http://192.168.0.101:3000/";

describe('Poll creation', () => {
  const pollCreationVisit = (title, choices, due) => {
    cy.visit(HOST + 'chat')
    cy.get('a[href^="/chat/group/"]').first().click()
    cy.contains('Cuộc trò chuyện chung').click()
    cy.get('button[aria-label="Tạo bình chọn"]').click()

    // Fill the poll title
    cy.contains('label', 'Câu hỏi bình chọn')
    .parent()
    .find('input')
    .type(title)

    // Fill the poll choices
    if (choices.length > 2) {
      const cnt = choices.length - 2
      for (let i = 0; i < cnt; i++) {
        cy.get('button[aria-label="Thêm lựa chọn"]').click()
      }

      for (let i = 0; i < choices.length; i++) {
        const title = "Lựa chọn " + (i + 1)
        cy.contains('label', title)
        .parent()
        .find('input')
        .type(choices[i])
      }
    }

    // Fill the poll end date
    cy.get('input[placeholder="Không có thời hạn"]').type(due) // 31/08/2024 23:59
  }
  it('Create Valid Poll with Two Options and a Future End Date', () => {
    cy.userLogin()
    pollCreationVisit('Favorite Color', ['Red', 'Blue', 'Green'], '31/08/202423:59')
  })
})
