import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});

const dataToValidate = {
  name: 'John Smith',
  phoneNumber: '0976765677',
  email: 'john@info.com',
  isFavourite: true,
  contactType: 'work',
};

const validationResult = createContactSchema.validate(dataToValidate);
if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid');
}
