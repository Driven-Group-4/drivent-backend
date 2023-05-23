import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  console.log({ event });

  await prisma.ticketType.deleteMany({});
  await prisma.ticketType.createMany({data: [
    {
      name: 'P100',
      price: 60000,
      isRemote: false,
      includesHotel: true,
    },
    {
      name: 'P50',
      price: 50000,
      isRemote: false,
      includesHotel: false
    },
    {
      name: 'O100',
      price: 20000,
      isRemote: true,
      includesHotel: false,
    },
  ]});
  
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
  const hotel1 = await prisma.hotel.create({ data: { name: 'Driven Resort', image: 'https://cdn.pixabay.com/photo/2017/01/28/19/31/landscape-2016308_640.jpg'}});
  const hotel2 = await prisma.hotel.create({ data: { name: 'Driven Palace', image: 'https://cdn.pixabay.com/photo/2014/09/26/04/54/holiday-complex-461628_640.jpg'}});
  const hotel3 = await prisma.hotel.create({ data: { name: 'Driven World', image: 'https://cdn.pixabay.com/photo/2017/12/16/22/22/bora-bora-3023437_640.jpg'}});
  
  await prisma.room.createMany({
    data: [
      { name: 'R101', capacity: 3, hotelId: hotel1.id},
      { name: 'R102', capacity: 2, hotelId: hotel1.id},
      { name: 'R103', capacity: 1, hotelId: hotel1.id},
      { name: 'R104', capacity: 4, hotelId: hotel1.id},
      { name: 'R105', capacity: 2, hotelId: hotel1.id},
    ]
  });
  await prisma.room.createMany({
    data: [
      { name: 'P101', capacity: 3, hotelId: hotel2.id},
      { name: 'P102', capacity: 2, hotelId: hotel2.id},
      { name: 'P104', capacity: 4, hotelId: hotel2.id},
      { name: 'P105', capacity: 2, hotelId: hotel2.id},
    ]
  });
  await prisma.room.createMany({
    data: [
      { name: 'W101', capacity: 3, hotelId: hotel3.id},
      { name: 'W102', capacity: 2, hotelId: hotel3.id},
      { name: 'W103', capacity: 1, hotelId: hotel3.id},
      { name: 'W105', capacity: 2, hotelId: hotel3.id},
    ]
  });

  await prisma.activity.deleteMany({});
  await prisma.location.deleteMany({});
  const location1 = await prisma.location.create({data: {name: 'Auditório Principal'}});
  const location2 = await prisma.location.create({data: {name: 'Auditório Lateral'}});
  const location3 = await prisma.location.create({data: {name: 'Sala de Workshop'}});

  const activity1 = await prisma.activity.create({
    data: {
      name: 'Minecraft: montando o PC ideal',
      startsAt: dayjs().set('hour', 6).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 7).set('minute', 0).set('second', 0).toDate(),
      availableSeats: 27,
      locationId: location1.id,
    }
  });
  const activity2 = await prisma.activity.create({
    data: {
      name: 'LoL: montando o PC ideal',
      startsAt: dayjs().set('hour', 7).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 8).set('minute', 0).set('second', 0).toDate(),
      availableSeats: 10,
      locationId: location1.id,
    }
  });
  const activity3 = await prisma.activity.create({
    data: {
      name: 'Palestra x',
      startsAt: dayjs().set('hour', 6).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 8).set('minute', 0).set('second', 0).toDate(),
      availableSeats: 27,
      locationId: location2.id,
    }
  });
  const activity4 = await prisma.activity.create({
    data: {
      name: 'Palestra y',
      startsAt: dayjs().set('hour', 6).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 7).set('minute', 0).set('second', 0).toDate(),
      availableSeats: 12,
      locationId: location3.id,
    }
  });
  const activity5 = await prisma.activity.create({
    data: {
      name: 'Palestra z',
      startsAt: dayjs().set('hour', 7).set('minute', 0).set('second', 0).toDate(),
      endsAt: dayjs().set('hour', 8).set('minute', 0).set('second', 0).toDate(),
      availableSeats: 5,
      locationId: location3.id,
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
