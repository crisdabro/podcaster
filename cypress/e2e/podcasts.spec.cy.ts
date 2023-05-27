describe('podcaster', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/');
    cy.intercept(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    ).as('getPodcasts');
    cy.wait('@getPodcasts').its('response.statusCode').should('eq', 200);
  });

  it('renders all podcasts', () => {
    cy.get('[data-testid="podcast"]').should('have.length', 100);
  });

  it('navigates to podcast details and goes to episode details on click', () => {
    cy.get('[data-testid="podcast"]').first().click();
    cy.contains('By The Joe Budden Network');
    cy.intercept(
      'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Flookup%3Fid%3D1535809341%26media%3Dpodcast%26entity%3DpodcastEpisode'
    ).as('getEpisodes');
    cy.wait('@getEpisodes').its('response.statusCode').should('eq', 200);
    cy.contains('Episodes: 50');
    cy.get('[data-testid="episode"]').first().click();
    cy.contains('The JBP starts this episode by sharing stories from their weekend');
  });
});
