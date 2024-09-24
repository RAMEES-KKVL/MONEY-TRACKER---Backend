export interface JwtPayloadInterface {
    user: string;
    iat?: number;
    exp?: number;
}

export interface JwtValidationResult {
    success : boolean
    result : string
}