const errorHandler = async (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "error";

    if (req.session) {
        try {
            // Abort the transaction if it's in progress
            await req.session.abortTransaction();
            req.session.endSession();
        } catch (abortError) {
            res.status(500).json('Error aborting transaction:', abortError);
        }
    }

    res.status(err.statusCode).json({
        error: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    })
}

module.exports = errorHandler;