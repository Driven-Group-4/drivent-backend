import Joi from 'joi';

export const activitiesSchema = Joi.object({
  activityId: Joi.number().required(),
  startsAt: Joi.string().required(),
});
