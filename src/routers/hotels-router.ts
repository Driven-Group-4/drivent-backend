import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getHotelsWithRooms, getHotelsWithRoomsInfo } from '@/controllers/hotel-controller';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', getHotels)
  .get('/rooms', getHotelsWithRoomsInfo)
  .get('/:hotelId', getHotelsWithRooms);

export { hotelsRouter };
