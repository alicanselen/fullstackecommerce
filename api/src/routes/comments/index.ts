import { Router } from "express";
import {
    createComment,
    listComments,
    getComment,
    updateComment,
    deleteComment,
} from './commentsController.js'; // Yeni controller fonksiyonlarını içe aktarın
import { validateData } from '../../middlewares/validatinMiddleware.js';
import { insertCommentSchema, updateCommentSchema } from '../../db/commentsSchema.js'; // Güncelleme şemasını da ekleyin
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

// Yorum ekleme
router.post(
    "/",
    verifyToken, // Kullanıcı kimlik doğrulaması
    validateData(insertCommentSchema), // Veri doğrulama
    createComment // Yorum ekleme fonksiyonu
);

// Tüm yorumları listeleme
router.get("/", listComments);

// Belirli bir yorumu getirme
router.get("/:id", getComment);

// Yorum güncelleme
router.put(
    "/:id",
    verifyToken, // Kullanıcı kimlik doğrulaması
    validateData(updateCommentSchema), // Veri doğrulama
    updateComment // Yorum güncelleme fonksiyonu
);

// Yorum silme
router.delete("/:id", verifyToken, deleteComment); // Kullanıcı kimlik doğrulaması ve yorum silme fonksiyonu

export default router;