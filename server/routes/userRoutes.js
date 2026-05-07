import express from 'express';
import { protect } from "../middlewares/auth.js";
import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// 🔓 Public route
router.post('/register', registerUser);
// 🔐 Protected routes
router.get('/', protect, getAllUsers);
router.get('/:id',protect, getUserById);
router.put('/:id',protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;