import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';

export async function schedulingActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { activityId } = req.body as Record<string, number>;
    const { startsAt } = req.body;
    await activitiesService.schedulingActivity(userId, activityId, startsAt);
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export async function getUserActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const list = await activitiesService.getUserActivities(userId);
    return res.send(list);
  } catch (error) {
    next(error);
  }
}

export async function delUserActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const activityId = Number(req.params.activityId);

  try {
    await activitiesService.delUserActivity(userId, activityId);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
