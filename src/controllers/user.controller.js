import * as userService from '../services/user.service.js';

export const create = async (req, res, next) => { // Added next
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error); // Passes to Global Error Handler in index.js
    }
};

export const fetchAll = async (req, res, next) => { // Added next
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const fetchOne = async (req, res, next) => { // Added next
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            // 404s are "handled" errors, so we return directly
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};