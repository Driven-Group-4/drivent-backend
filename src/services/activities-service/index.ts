import activitiesRepository from '@/repositories/activities-repository';

async function schedulingActivity(userId: number, activityId: number, startsAt: string) {
  await activitiesRepository.create(userId, activityId, startsAt);
}

async function getUserActivities(userId: number) {
  const list = await activitiesRepository.getUserActivities(userId);
  return list;
}

async function delUserActivity(userId: number, activityId: number) {
  await activitiesRepository.delUserActivity(userId, activityId);
}

export default {
  schedulingActivity,
  getUserActivities,
  delUserActivity,
};
