import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { JwtPayloadInterface, JwtValidationResult } from "../models/jwt.interface"

function verifyToken(token: string): JwtValidationResult {
    try {
        const decodedId = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadInterface
        return { success : true, result : decodedId.user }
    } catch (error) {
        if ( error instanceof TokenExpiredError ) {
            return { success : false, result : `${error.message}, Please login` }
        } else if ( error instanceof JsonWebTokenError) {
            return { success : false, result : `${error.message}, Please login` }
        } else {
            return { success : false, result : "Token verification error, please login" }
        }
    }
}

export default verifyToken