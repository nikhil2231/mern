/**
 * 
 * 
 * Generates a JSON Web Token (JWT) for the given user ID.
 *
 * @param {string} id - The user ID to include in the token payload.
 * @returns {string} The JWT token string.
 *
 * @throws {Error} If the JWT secret key is not set or is invalid.
 *
 * @example
 * const userId = '12345';
 * const token = tokenGenerator(userId);
 *
 * @description
 * This function generates a JWT token that can be used to authenticate a user. The token is signed with a secret key specified in the `JWT_KEY` environment variable and includes the user ID as a payload. The token is valid for 30 days from the time it is generated.
 */
import  jwt  from "jsonwebtoken";
const tokenGenerator = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '30d' });
}

export default tokenGenerator;
