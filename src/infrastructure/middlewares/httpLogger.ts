import { v4 as uuidv4 } from 'uuid';
import onFinished from 'on-finished';
import logger from '../log/logger';
import os from 'os';

const httpLogger = (req, res, next) => {
  const start = process.hrtime();
  const reqId = uuidv4();

  req.id = reqId;

  onFinished(res, () => {
    const [s, ns] = process.hrtime(start);
    const responseTime = (s * 1000 + ns / 1e6).toFixed(2);

    const log = {
      level: 'INFO',
      time: new Date().toISOString(),
      pid: process.pid,
      hostname: os.hostname(),
      name: process.env.SERVICE_NAME || 'restaurant-order-api',
      node_version: process.version,
      reqId,
      req: {
        id: reqId,
        method: req.method,
        url: req.originalUrl || req.url,
        query: req.query,
        params: req.params,
        headers: req.headers
      },
      res: {
        statusCode: res.statusCode,
        headers: res.getHeaders()
      },
      responseTime: `${responseTime}ms`
    };

    if (res.statusCode >= 500) {
      logger.error(log);
    } else if (res.statusCode >= 400) {
      logger.warn(log);
    } else {
      logger.info(log);
    }
  });

  next();
};

export default httpLogger;
