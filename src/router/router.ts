import { Router } from "express";
import { controller } from "../controller/controller";

const router=Router()

router.get('/incidents',controller.fetchAllincidents)
router.get('/fetch-seed',controller.fetchSeeds)
router.post('/incidents',controller.createIncident)

export {router}