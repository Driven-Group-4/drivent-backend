import { prisma } from '@/config';

async function create(userId: number, activityId: number, startsAt: string) {
  await prisma.schedule.create({
    data: {
      userId,
      activityId,
      startsAt,
    },
  });
  await prisma.activity.update({
    where: {
      id: activityId,
    },
    data: { availableSeats: { decrement: 1 } },
  });
}

async function getUserActivities(userId: number) {
  return await prisma.schedule.findMany({
    where: {
      userId,
    },
  });
}

async function delUserActivity(userId: number, activityId: number) {
  await prisma.schedule.deleteMany({
    where: {
      userId,
      activityId,
    },
  });
  await prisma.activity.update({
    where: {
      id: activityId,
    },
    data: { availableSeats: { increment: 1 } },
  });
}

export default {
  create,
  getUserActivities,
  delUserActivity,
};
