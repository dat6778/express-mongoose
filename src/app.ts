import express, {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';

// Import routes
import categoriesRouter from './routes/v1/categories.route'
import brandsRouter from './routes/v1/brands.route'
import queriesRouter from './routes/v1/queries.route'
import productsRouter from './routes/v1/products.route'
import brandRouter from './routes/v1/brands.route';
/** -------|| INITIAL APP || --------- */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
app.use('/api/v1/brands', brandRouter);

/** -------|| END REGISTER ROUTES || --------- */

// NO EDIT BEGIN HERE
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