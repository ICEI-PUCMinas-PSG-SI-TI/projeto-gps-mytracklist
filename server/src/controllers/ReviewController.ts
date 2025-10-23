import { IDatabase } from '../interfaces/IDatabase';

export class ReviewController {
  constructor(private db: IDatabase) {}

  /**
   * Obtém a avaliação de um utilizador para uma música específica.
   */
  async getReviewForTrack(userId: number, trackId: string) {
    try {
      const review = await this.db.get(
        'SELECT * FROM reviews WHERE userId = ? AND trackId = ?',
        [userId, trackId]
      );
      return { success: true, review: review || null };
    } catch (error) {
      console.error('Falha ao obter avaliação:', error);
      return { success: false, message: 'Falha ao obter avaliação.' };
    }
  }

  /**
   * Cria uma nova avaliação.
   */
  async createReview(userId: number, trackId: string, rating: number) {
    if (rating < 0 || rating > 10) {
      return { success: false, message: 'A avaliação deve estar entre 0 e 10.' };
    }
    try {
      const result = await this.db.run(
        'INSERT INTO reviews (userId, trackId, rating, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
        [userId, trackId, rating]
      );
      return { success: true, reviewId: result.lastInsertRowid };
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return { success: false, message: 'Já avaliou esta música.' };
      }
      console.error('Falha ao criar avaliação:', error);
      return { success: false, message: 'Falha ao criar avaliação.' };
    }
  }

  /**
   * Atualiza uma avaliação existente.
   */
  async updateReview(reviewId: number, userId: number, rating: number) {
    if (rating < 0 || rating > 10) {
      return { success: false, message: 'A avaliação deve estar entre 0 e 10.' };
    }
    try {
      const result = await this.db.run(
        'UPDATE reviews SET rating = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ? AND userId = ?',
        [rating, reviewId, userId]
      );
      
      if (result.changes === 0) {
        return { success: false, message: 'Avaliação não encontrada ou não pertence ao utilizador.' };
      }
      return { success: true };
    } catch (error) {
      console.error('Falha ao atualizar avaliação:', error);
      return { success: false, message: 'Falha ao atualizar avaliação.' };
    }
  }

  /**
   * Apaga uma avaliação.
   */
  async deleteReview(reviewId: number, userId: number) {
    try {
      const result = await this.db.run(
        'DELETE FROM reviews WHERE id = ? AND userId = ?',
        [reviewId, userId]
      );

      if (result.changes === 0) {
        return { success: false, message: 'Avaliação não encontrada ou não pertence ao utilizador.' };
      }
      return { success: true };
    } catch (error) {
      console.error('Falha ao apagar avaliação:', error);
      return { success: false, message: 'Falha ao apagar avaliação.' };
    }
  }
}
