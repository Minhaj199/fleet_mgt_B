import { Router } from "express";
import { controller } from "../controller/controller";

const router=Router()

router.get('/incidents',controller.fetchincident)
router.get('/fetch-seed',controller.fetchSeeds)
router.post('/incidents',controller.createIncident)
router.post('/incidents/updates/:id',controller.updateIncident)
router.put('/incidents/:id',controller.modifyIncident)

export {router}