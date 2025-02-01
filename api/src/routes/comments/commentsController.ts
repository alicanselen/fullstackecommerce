import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { commentsTable } from "../../db/commentsSchema.js";
import { eq } from "drizzle-orm";

// Yorum ekleme
export async function createComment(req: Request, res: Response): Promise<void> {
    try {
        const { productId, orderId, comment } = req.body;
        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: "Kullanıcı bilgisi eksik." });
            return; // return ekleyin
        }

        const [newComment] = await db
            .insert(commentsTable)
            .values({
                userId,
                productId,
                orderId,
                comment,
            })
            .returning();

        res.status(201).json(newComment);
        return; // return ekleyin
    } catch (error) {
        console.error("Yorum eklenirken hata oluştu:", error);
        res.status(500).json({ message: "Yorum eklenirken bir hata oluştu." });
        return; // return ekleyin
    }
}

// Tüm yorumları listeleme
export async function listComments(req: Request, res: Response): Promise<void> {
    try {
        const comments = await db.select().from(commentsTable);
        res.status(200).json(comments);
        return; // return ekleyin
    } catch (error) {
        console.error("Yorumlar listelenirken hata oluştu:", error);
        res.status(500).json({ message: "Yorumlar listelenirken bir hata oluştu." });
        return; // return ekleyin
    }
}

// Belirli bir yorumu getirme
export async function getComment(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id);

        const comment = await db
            .select()
            .from(commentsTable)
            .where(eq(commentsTable.id, id));

        if (comment.length === 0) {
            res.status(404).json({ message: "Yorum bulunamadı." });
            return; // return ekleyin
        }

        res.status(200).json(comment[0]);
        return; // return ekleyin
    } catch (error) {
        console.error("Yorum getirilirken hata oluştu:", error);
        res.status(500).json({ message: "Yorum getirilirken bir hata oluştu." });
        return; // return ekleyin
    }
}

// Yorum güncelleme
export async function updateComment(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id);
        const { comment } = req.body;

        const [updatedComment] = await db
            .update(commentsTable)
            .set({ comment })
            .where(eq(commentsTable.id, id))
            .returning();

        if (!updatedComment) {
            res.status(404).json({ message: "Yorum bulunamadı." });
            return; // return ekleyin
        }

        res.status(200).json(updatedComment);
        return; // return ekleyin
    } catch (error) {
        console.error("Yorum güncellenirken hata oluştu:", error);
        res.status(500).json({ message: "Yorum güncellenirken bir hata oluştu." });
        return; // return ekleyin
    }
}

// Yorum silme
export async function deleteComment(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id);

        const [deletedComment] = await db
            .delete(commentsTable)
            .where(eq(commentsTable.id, id))
            .returning();

        if (!deletedComment) {
            res.status(404).json({ message: "Yorum bulunamadı." });
            return; // return ekleyin
        }

        res.status(200).json({ message: "Yorum başarıyla silindi.", deletedComment });
        return; // return ekleyin
    } catch (error) {
        console.error("Yorum silinirken hata oluştu:", error);
        res.status(500).json({ message: "Yorum silinirken bir hata oluştu." });
        return; // return ekleyin
    }
}