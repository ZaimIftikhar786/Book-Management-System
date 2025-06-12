import { Response } from 'express';
import BaseResponseDto from './base.response.dto';

export default class ReviewResponseDto extends BaseResponseDto {
  constructor(res: Response,bookData: any[]) {
    super (
        res,
        200,
        'OK',
        'Books Fetched successfully',
        bookData
    );
  }
}
