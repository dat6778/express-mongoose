import express, {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';

// Import routes
import brandsRouter from './routes/v1/brands.route';
import categoriesRouter from './routes/v1/categories.route';
import productsRouter from './routes/v1/products.route';
import queriesRouter from './routes/v1/queries.route';
import staffRouter from './routes/v1/staff.route';
import customerRouter from './routes/v1/customer.route';
import orderRouter from './routes/v1/order.route';


/** -------|| INITIAL APP || --------- */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
app.use('/api/v1', staffRouter);
app.use('/api/v1', customerRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', categoriesRouter);
app.use('/api/v1', brandsRouter);
app.use('/api/v1', productsRouter);
app.use('/api/v1', queriesRouter);



/** -------|| END REGISTER ROUTES || --------- */

/** -------|| BEGIN HANDLE ERRORS || --------- */
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler, catch 5xx errors
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ 
    statusCode: statusCode, 
    message: err.message,
    data: null
  });
});
/** -------|| END HANDLE ERRORS || --------- */

export default app;