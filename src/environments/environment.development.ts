export const environment = {
  production: false,
  baseUrl: process.env['BASE_API'] || 'http://localhost:5000',
  patterns: {
    locale: 'en-US',
    dateFormat: 'dd/MM/yyyy',
    currencyFormat: 'BRL',
  },
  JWT: {
    access_token_key: process.env['ACCESS_TOKEN_KEY'] || 'access_token',
    refresh_token_key: process.env['REFRESH_TOKEN_KEY'] || 'refresh_token',
  }
};
