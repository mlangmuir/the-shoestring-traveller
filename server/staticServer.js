import express from 'express';
import path from 'path';

import { isDevelopment } from './config';

export const initStaticServer = (app: express.Express) => {
    if (isDevelopment()) {
        return;
    }

    const clientDistPath = path.resolve(__dirname, '../public_html/');

    app.use(express.static(clientDistPath));
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/')) {
        next();

        return;
        }

        res.sendFile(path.resolve(clientDistPath, 'index.html'));
    });
};