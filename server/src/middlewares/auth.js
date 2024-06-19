import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../config/auth.js";
import { USER_TYPE } from "../constants.js";

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token does not exist" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        const info =
            decoded.type && decoded.type === USER_TYPE.ORGANIZATION
                ? {
                      userId: decoded.id,
                      organizationId: decoded.organizationId,
                      type: decoded.type,
                      role: decoded.role,
                  }
                : {
                      userId: decoded.id,
                      type: decoded.type,
                  };

        req.loggedUserInfo = info;

        return next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid Token" });
    }
};
