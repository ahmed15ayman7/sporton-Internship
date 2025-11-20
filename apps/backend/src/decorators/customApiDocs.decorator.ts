import { applyDecorators, Type } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse,
  ApiBody, 
  ApiExtraModels, 
  getSchemaPath 
} from '@nestjs/swagger';
export interface CustomApiDocsOptions {
  action: string;
  summary?: string;
  type?: 'create' | 'update' | 'none';
  createDto?: Type<any>;
  updateDto?: Type<any>;
  responseDto?: Type<any>;
  responseStatus?: number;
  badRequestDescription?: string;
}
  export function CustomApiDocs(
    options: CustomApiDocsOptions
  ): ReturnType<typeof applyDecorators> {
  
    const {
      action,
      summary = '',
      type = 'none',
      createDto,
      updateDto,
      responseDto,
      responseStatus = 200,
      badRequestDescription = `فشل ${action} ${summary}`
    } = options;
  
    const requestDecorators: any[] = [];
  
    if (type === 'create' && createDto) {
      requestDecorators.push(ApiBody({ type: createDto }));
    }
  
    if (type === 'update' && updateDto) {
      requestDecorators.push(ApiBody({ type: updateDto }));
    }
  
    const responseDecorators: any[] = [];
  
    if (responseDto) {
      responseDecorators.push(
        ApiExtraModels(responseDto),
        ApiResponse({
          status: responseStatus,
          description: `تم ${action} ${summary}`,
          schema: { $ref: getSchemaPath(responseDto) }
        })
      );
    } else {
      responseDecorators.push(
        ApiResponse({
          status: responseStatus,
          description: `تم ${action} ${summary}`
        })
      );
    }
  
    responseDecorators.push(
      ApiResponse({
        status: 400,
        description: badRequestDescription
      })
    );
  
    return applyDecorators(
      ApiOperation({ summary: `${action} ${summary}` }),
      ...requestDecorators,
      ...responseDecorators
    );
  }
  