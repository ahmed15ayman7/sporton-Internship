// import { Controller, Get, Query, UseGuards } from '@nestjs/common';
// import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
// import { DashboardService, DashboardFilters } from './dashboard.service';
// import { JwtAuthAdminGuard } from '../../auth-admin/guards/jwt-auth.admin.guard';
// @ApiTags('dashboard')
// @ApiBearerAuth()
// @UseGuards(JwtAuthAdminGuard)
// @Controller('dashboard')
// export class DashboardController {
//   constructor(private readonly dashboardService: DashboardService) {}

//   /**
//    * Get dashboard overview
//    * @param filters Dashboard filters from query parameters
//    */
//   @Get('overview')
//   async getDashboardOverview(
//     @Query('userId') userId?: string,
//     @Query('teamId') teamId?: string,
//     @Query('matchId') matchId?: string,
//     @Query('sport') sport?: string,
//     @Query('role') role?: string,
//     @Query('dateFrom') dateFrom?: string,
//     @Query('dateTo') dateTo?: string,
//     @Query('status') status?: string,
//     @Query('category') category?: string,
//     @Query('limit') limit?: string,
//     @Query('offset') offset?: string,
//   ) {
//     const filters: DashboardFilters = {
//       userId,
//       teamId,
//       matchId,
//       sport,
//       role,
//       dateFrom,
//       dateTo,
//       status,
//       category,
//       limit: limit ? parseInt(limit) : undefined,
//       offset: offset ? parseInt(offset) : undefined,
//     };

//     return await this.dashboardService.getDashboardOverview(filters);
//   }

//   /**
//    * Get dashboard statistics
//    * @param filters Dashboard filters from query parameters
//    */
//   @Get('statistics')
//   async getDashboardStatistics(
//     @Query('userId') userId?: string,
//     @Query('teamId') teamId?: string,
//     @Query('matchId') matchId?: string,
//     @Query('sport') sport?: string,
//     @Query('role') role?: string,
//     @Query('dateFrom') dateFrom?: string,
//     @Query('dateTo') dateTo?: string,
//     @Query('status') status?: string,
//     @Query('category') category?: string,
//     @Query('limit') limit?: string,
//     @Query('offset') offset?: string,
//   ) {
//     const filters: DashboardFilters = {
//       userId,
//       teamId,
//       matchId,
//       sport,
//       role,
//       dateFrom,
//       dateTo,
//       status,
//       category,
//       limit: limit ? parseInt(limit) : undefined,
//       offset: offset ? parseInt(offset) : undefined,
//     };

//     return await this.dashboardService.getDashboardStatistics(filters);
//   }

//   /**
//    * Get available dashboard filters
//    */
//   @Get('filters')
//   async getDashboardFilters() {
//     return await this.dashboardService.getDashboardFilters();
//   }

//   /**
//    * Get dashboard metrics only
//    * @param filters Dashboard filters from query parameters
//    */
//   @Get('metrics')
//   async getDashboardMetrics(
//     @Query('userId') userId?: string,
//     @Query('teamId') teamId?: string,
//     @Query('matchId') matchId?: string,
//     @Query('sport') sport?: string,
//     @Query('role') role?: string,
//     @Query('dateFrom') dateFrom?: string,
//     @Query('dateTo') dateTo?: string,
//     @Query('status') status?: string,
//     @Query('category') category?: string,
//     @Query('limit') limit?: string,
//     @Query('offset') offset?: string,
//   ) {
//     const filters: DashboardFilters = {
//       userId,
//       teamId,
//       matchId,
//       sport,
//       role,
//       dateFrom,
//       dateTo,
//       status,
//       category,
//       limit: limit ? parseInt(limit) : undefined,
//       offset: offset ? parseInt(offset) : undefined,
//     };

//     const overview = await this.dashboardService.getDashboardOverview(filters);
//     return overview.metrics;
//   }

//   /**
//    * Get recent activity only
//    * @param filters Dashboard filters from query parameters
//    */
//   @Get('activity')
//   async getRecentActivity(
//     @Query('userId') userId?: string,
//     @Query('teamId') teamId?: string,
//     @Query('matchId') matchId?: string,
//     @Query('sport') sport?: string,
//     @Query('role') role?: string,
//     @Query('dateFrom') dateFrom?: string,
//     @Query('dateTo') dateTo?: string,
//     @Query('status') status?: string,
//     @Query('category') category?: string,
//     @Query('limit') limit?: string,
//     @Query('offset') offset?: string,
//   ) {
//     const filters: DashboardFilters = {
//       userId,
//       teamId,
//       matchId,
//       sport,
//       role,
//       dateFrom,
//       dateTo,
//       status,
//       category,
//       limit: limit ? parseInt(limit) : undefined,
//       offset: offset ? parseInt(offset) : undefined,
//     };

//     const overview = await this.dashboardService.getDashboardOverview(filters);
//     return overview.recentActivity;
//   }

//   /**
//    * Get system health
//    */
//   @Get('health')
//   async getSystemHealth() {
//     const overview = await this.dashboardService.getDashboardOverview({});
//     return overview.systemHealth;
//   }
// }
