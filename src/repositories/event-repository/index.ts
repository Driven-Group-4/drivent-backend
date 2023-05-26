import { prisma, redis } from '@/config';

async function findFirst() {
  const cacheKey = 'event';
  if (process.env.NODE_ENV !== 'test') {
    const cachedEvent = await redis.get(cacheKey);
    if (cachedEvent) {
      const event = JSON.parse(cachedEvent);
      return event;
    }
  }

  const findEvent = await prisma.event.findFirst();

  const event = await prisma.event.findFirst({
    where: { id: findEvent.id },
    include: {
      Location: {
        include: {
          Activity: true,
        },
      },
    },
  });

  redis.setEx(cacheKey, 3, JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
