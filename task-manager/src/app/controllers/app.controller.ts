import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

export enum StatusCodes {
  OK = 'Ok',
  UNHEALTHY = 'Unhealthy'
}

@Controller()
@ApiTags('health')
export class AppController {
  @Get()
  @ApiOperation({ 
    summary: 'health check',
    description: 'Serves a health status check for kubernetes or AWS loadbalancer'
  })
  @ApiOkResponse({ schema: { 
    properties: { 
      status: {
        type: 'enum',
        enum: [StatusCodes.OK, StatusCodes.UNHEALTHY]
      }
    } 
  }})
  health() {
    return { status: StatusCodes.OK };
  }
}
