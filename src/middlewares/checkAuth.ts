import { NextFunction, Request, Response } from 'express'
import { NotAuthorize } from '../errors'
import { CommonClass } from '../services/common'
import * as DAToken from '../data-access/token.service'
const common = new CommonClass()

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token, refresh_token } = req.signedCookies

    if (!refresh_token) {
      throw new NotAuthorize('Not Authorize to access page!')
    }

    if (access_token) {
      const payload = common.verifyPayload(access_token)
      req.userInfo = payload
      return next()
    }

    const data: any = common.verifyPayload(refresh_token)
    const { id, name, email, role, refreshTokenDb } = data
    const token = await DAToken.read({ userId: id })
    if (!token || !token.isValid) {
      throw new NotAuthorize('Not Authorize to access page!')
    }

    common.createJwtTokenAndAttachCookieToRes({
      res,
      payload: { id, name, email, role },
      refreshTokenDb: refreshTokenDb
    })

    req.userInfo = { id, name, email, role }
    next()
  } catch (error) {
    // log and throw error
    console.log(`Error in auth - ${error}`)
    throw new NotAuthorize('Not authorize')
  }
}

export const isAllowed = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { id, name, email, role } = req.userInfo
    if (!roles.includes(role)) {
      throw new NotAuthorize('Not authorize to access')
    }
    next()
  }
}

// for future use
/* export const moduleCheck = (moduleName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.userInfo.moduleName) {
            throw new BadRequest("Can not process your request now");
        }
        req.userInfo.moduleName = moduleName;
        next();
    };
};

export const accessCheck = (moduleNames: any, activityName: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // if (!req.userInfo.moduleName) {
        //     throw new BadRequest('Can not process your request now')
        // }
        const { role } = req.userInfo;
        await _checkAccess({
            moduleNames,
            roleName: role,
            activityName,
            email: req.userInfo.email,
            uri: req.userInfo.mongo_uri,
        });

        next();
    };
};

 */
