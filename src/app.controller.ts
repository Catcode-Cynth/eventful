import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: '🚀 Eventful API is live!',
      docs: '/api/docs'
    };
  }
}