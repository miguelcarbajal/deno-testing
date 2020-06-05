import { Router } from "https://deno.land/x/oak/mod.ts"
import { getHome, getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/index.controller.ts";

export const router = new Router()

router.get('/', getHome)
router.get('/user', getUsers)
router.get('/user/:id', getUser)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

