const Response = {
    success: ({ res, code = 200, message = 'success', data }) =>
        res.status(code).json({
            data,
            message,
            success: 'success',
        }),
    error: ({ res, code = 400, message = 'failed', error }) =>
        res.status(code).json({
            message,
            success: 'failed',
            erorr: {
                code: error.code,
                message: error.message,
            },
        }),
};

export default Response;
