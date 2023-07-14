import {Router} from "express";
import {instance as db} from './../db/database.js';
const router = Router();

router.get('/ping', (req, res) => {
    db.pingDB()
        .then((healthCheck) => {
            if (healthCheck) {
                res.status(200).json({
                        'status': 'OK', // or "ERROR"
                        'details': {
                            'mongodb': 'OK' // or "ERROR"
                        }
                    }
                );
            } else {
                res.status(500).json({
                    'status': 'ERROR',
                    'details': {
                        'mongodb': 'ERROR'
                    }
                });
            }
        })
        .catch((e) => res.status(500).json(e));
})

export default router