export const notFound = (req,res,next)=> {
  const error = new Error(`This site is not Available ${req.url}`)
  res.status(404);
  next(error);
}

export const errorHandler = (err,req,res,next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let msg = err.message;
  
  if(err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    msg = 'Resource not Found';
  }

  res.status(statusCode).json({
    message:msg,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
  next();
}