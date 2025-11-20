
import { ApiProperty } from '@nestjs/swagger';
export class PaginatedResponseDto {
    @ApiProperty({ type: [Object] })
    data: Object[];
    @ApiProperty({ type: Object })
    meta: {
        total: number;
        skip: number;
        take: number;
        hasMore: boolean;
    };
} 