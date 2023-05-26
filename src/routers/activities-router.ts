import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { activitiesSchema } from '@/schemas/activities-schemas';
import { delUserActivity, getUserActivities, schedulingActivity } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken);
activitiesRouter.post('/', validateBody(activitiesSchema), schedulingActivity);
activitiesRouter.get('/', getUserActivities);
activitiesRouter.delete('/:activityId', delUserActivity);

export { activitiesRouter };
