import dayjs from 'dayjs';
import { prisma } from '@/config';

export async function createActivity(locationId: number) {
  return await prisma.activity.create({
    data: {
      locationId,
      name: 'alguma coisa',
      startsAt: dayjs().subtract(1, 'day').toDate(),
      endsAt: dayjs().toDate(),
      availableSeats: 5,
    },
  });
}

export async function postUserActivity(userId: number, activityId: number, startsAt: Date) {
  return await prisma.schedule.create({
    data: {
      userId,
      activityId,
      startsAt,
    },
  });
}
