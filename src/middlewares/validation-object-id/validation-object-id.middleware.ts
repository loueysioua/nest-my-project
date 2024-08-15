import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidationObjectIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    next();
  }
}
