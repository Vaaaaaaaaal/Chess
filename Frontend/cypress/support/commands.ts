import { Color, PieceType } from '@/model/Pieces.model';

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      createGame(color: 'BLACK' | 'WHITE'): Chainable<void>;
      movePiece(fromPos: string, toPos: string): Chainable<void>;
      assertPieceAt(position: string, piece: { type: PieceType; color: Color }): Chainable<void>;
      waitForBoardUpdate(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-cy=username-input]').type(username);
  cy.get('[data-cy=password-input]').type(password);
  cy.get('[data-cy=login-button]').click();
  cy.url().should('include', '/');
});

Cypress.Commands.add('createGame', (color: 'BLACK' | 'WHITE') => {
  cy.get('[data-cy=new-game-button]').click();
  cy.get(`[data-cy=color-${color.toLowerCase()}]`).click();
  cy.get('[data-cy=create-game-button]').click();
  cy.url().should('include', '/game');
  cy.waitForBoardUpdate();
});

Cypress.Commands.add('movePiece', (fromPos: string, toPos: string) => {
  const [fromRow, fromCol] = fromPos.split('');
  const [toRow, toCol] = toPos.split('');
  
  cy.get(`[data-cy=cell-${fromRow}-${fromCol}]`).click();
  cy.get(`[data-cy=cell-${toRow}-${toCol}]`).click();
  cy.waitForBoardUpdate();
});

Cypress.Commands.add('waitForBoardUpdate', () => {
  cy.wait(500); // Attendre les animations
  cy.get('[data-cy=chess-board]').should('exist');
});

Cypress.Commands.add('assertPieceAt', (position: string, piece: { type: PieceType; color: Color }) => {
  const [row, col] = position.split('');
  cy.get(`[data-cy=cell-${row}-${col}]`)
    .find('.piece')
    .should('have.attr', 'data-piece-type', piece.type)
    .should('have.attr', 'data-piece-color', piece.color);
}); 