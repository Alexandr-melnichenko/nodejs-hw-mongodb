import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      next(createHttpError(401, 'Please provide Authorization header'));
      return;
    }

    const parts = authHeader.split(' ');
    const bearer = parts[0];
    const token = parts?.[1];

    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    const session = await SessionCollection.findOne({
      accessToken: token,
    });

    if (!session) {
      next(createHttpError(401, 'Session not found'));
      return;
    }

    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await UserCollection.findById(session.userId);

    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(500, 'Internal server error'));
  }
};
