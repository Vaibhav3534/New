import jwt from "jsonwebtoken"
// import cookieParser from "cookie-parser";


const checkAuth = (req, res, next) => {

    try {
        const token = req.body.token;
        console.log(token)

        if (!token || token === undefined) {
            return res
                .status(202)
                .send({success:false,message:"No token Provided"})
        }

        jwt.verify(token, process.env.SECRETE_KEY)
        const data = jwt.decode(token)
        console.log(data)

        next()

    } catch (err) {
        console.log(err.message)
        res
            // .status(401)
            .send({ success:false,message:err.message})
    }
}


export default checkAuth