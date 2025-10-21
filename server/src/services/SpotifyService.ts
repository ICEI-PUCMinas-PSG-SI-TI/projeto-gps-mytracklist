// Interface para definir a estrutura do nosso token guardado
interface SpotifyToken {
  accessToken: string;
  expiresAt: number; // Timestamp de quando o token expira
}

export class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private token: SpotifyToken | null = null;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID || '';
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';

    if (!this.clientId || !this.clientSecret) {
      console.error('ERRO CRÍTICO: As credenciais do Spotify (CLIENT_ID e CLIENT_SECRET) não estão definidas!');
      throw new Error('Credenciais do Spotify não configuradas.');
    }
  }

  /**
   * Verifica se o token atual ainda é válido.
   * Considera o token inválido se for expirar nos próximos 60 segundos para ter uma margem de segurança.
   */
  private isTokenValid(): boolean {
    return this.token ? this.token.expiresAt > Date.now() + 60 * 1000 : false;
  }

  /**
   * Contacta a API do Spotify para obter um novo token de acesso.
   */
  private async fetchNewToken(): Promise<void> {
    console.log('A obter um novo token de acesso do Spotify...');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Falha ao obter o token do Spotify:', errorBody);
      throw new Error('Falha ao obter o token do Spotify.');
    }

    const data = await response.json();

    this.token = {
      accessToken: data.access_token,
      // A API retorna 'expires_in' em segundos. Convertemos para um timestamp absoluto em milissegundos.
      expiresAt: Date.now() + (data.expires_in * 1000)
    };
    console.log('Novo token do Spotify obtido com sucesso!');
  }

  /**
   * Método público para obter um token de acesso válido.
   * Reutiliza o token guardado se ainda for válido, ou busca um novo se necessário.
   */
  public async getAccessToken(): Promise<string> {
    if (!this.isTokenValid()) {
      await this.fetchNewToken();
    }
    // O '!' no final diz ao TypeScript: "Eu garanto que this.token não é nulo aqui."
    return this.token!.accessToken;
  }
}
