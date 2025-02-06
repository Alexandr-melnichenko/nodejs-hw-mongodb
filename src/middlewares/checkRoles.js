import createHttpError from 'http-errors';
import { ROLES } from '../constants.js';
import { ContactsCollection } from '../db/models/contact.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;
    if (roles.includes(ROLES.USER)) {
      next();
      return;
    }

    const owner = await ContactsCollection.findOne({
      _id: userId,
    });

    if (owner) {
      next();
      return;
    }
  };
