const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/apiError");

module.exports = function (...roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.BadRequest("No header"));
            }
            const token = authorizationHeader.split(' ')[1];
            if (!token) {
                return next(ApiError.BadRequest("No token"));
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            console.log(req.user);
            if(roles && roles.includes(req.user.role)){
                next();
            }else {
                return next(ApiError.PermissionError())
            }
        } catch (e) {
            res.status(401).json({ message: "Not authorized" });
        }
    };
};
