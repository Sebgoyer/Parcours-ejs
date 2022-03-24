module.exports = {
    log: (request, response, next) => {
        
        const now = new Date();
        const dateIso = now.toISOString();

       
        request.on('end', () => {
            console.info(`[${dateIso} ${request.ip}] ${request.method} ${response.statusCode} ${request.path}`);
        });

        next();
    }
}