import { prisma } from '@/config';

export async function createLocation(eventId: number) {
  return await prisma.location.create({
    data: {
      eventId,
      name: 'alguma coisa',
    },
  });
}
