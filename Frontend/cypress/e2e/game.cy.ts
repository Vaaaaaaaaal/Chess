describe('Chess Game', () => {
  beforeEach(() => {
    cy.login('testuser', 'password123');
  });

  it('should allow basic pawn movement', () => {
    cy.createGame('WHITE');
    
    // Déplacer un pion
    cy.movePiece('61', '51');
    
    // Vérifier que le pion a bien bougé
    cy.assertPieceAt('51', { 
      type: PieceType.PAWN, 
      color: Color.WHITE 
    });
    
    // Vérifier que l'ancienne position est vide
    cy.get('[data-cy=cell-61]')
      .find('.piece')
      .should('not.exist');
  });

  it('should handle piece capture correctly', () => {
    cy.createGame('WHITE');
    
    // Séquence de mouvements pour capturer une pièce
    cy.movePiece('61', '51');
    cy.movePiece('71', '61');
    cy.movePiece('51', '42');
    
    // Vérifier que la pièce capturée apparaît dans la liste des pièces capturées
    cy.get('[data-cy=captured-pieces-black]')
      .find('.piece')
      .should('have.length', 1);
  });
}); 