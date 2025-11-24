import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MonitorService, MonitorFilters } from './monitor.service';
import { JwtAuthAdminGuard } from '../../auth-admin/guards/jwt-auth.admin.guard';
import { AdminRolesGuard } from '../../auth-admin/guards/adminRoles.guard';
import { AdminRoles } from '../../decorators/adminRoles.decorator';
import { AdminRole } from '@shared/prisma';

@ApiTags('monitor')
@ApiBearerAuth()
@UseGuards(JwtAuthAdminGuard, AdminRolesGuard)
@AdminRoles(AdminRole.MONITOR)
@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  /**
   * B1: جلب الإحصائيات الأساسية للمنصة
   * GET /monitor/summary
   */
  @Get('summary')
  @ApiOperation({
    summary: 'جلب الإحصائيات الأساسية',
    description: 'إجمالي الحسابات (الكلية والنشطة) بمقاييس الأنشطة اليومية',
  })
  @ApiQuery({ name: 'dateFrom', required: false, type: String })
  @ApiQuery({ name: 'dateTo', required: false, type: String })
  async getSummary(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const filters: MonitorFilters = { dateFrom, dateTo };
    return await this.monitorService.getSummary(filters);
  }

  /**
   * B2: جلب عدد الحسابات لكل فئة مستخدم
   * GET /monitor/accounts/categories
   */
  @Get('accounts/categories')
  @ApiOperation({
    summary: 'جلب عدد الحسابات لكل فئة مستخدم',
    description: 'مثال: مدرب، لاعب، جمهور',
  })
  @ApiQuery({ name: 'dateFrom', required: false, type: String })
  @ApiQuery({ name: 'dateTo', required: false, type: String })
  async getAccountsCategories(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const filters: MonitorFilters = { dateFrom, dateTo };
    return await this.monitorService.getAccountsCategories(filters);
  }

  /**
   * B3: جلب إحصائيات الحسابات الاحترافية والاشتراكات
   * GET /monitor/accounts/subscriptions
   */
  @Get('accounts/subscriptions')
  @ApiOperation({
    summary: 'جلب إحصائيات الحسابات الاحترافية والاشتراكات',
    description: 'الحسابات الاحترافية والاشتراكات الشهرية والسنوية',
  })
  @ApiQuery({ name: 'dateFrom', required: false, type: String })
  @ApiQuery({ name: 'dateTo', required: false, type: String })
  async getSubscriptions(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const filters: MonitorFilters = { dateFrom, dateTo };
    return await this.monitorService.getSubscriptions(filters);
  }

  /**
   * B4: جلب بيانات الرسم البياني الدائري لتوزيع المستخدمين حسب الجنس
   * GET /monitor/charts/gender
   */
  @Get('charts/gender')
  @ApiOperation({
    summary: 'جلب بيانات الرسم البياني الدائري',
    description: 'توزيع المستخدمين حسب الجنس (رجال - نساء - أطفال) كنسب مئوية',
  })
  @ApiQuery({ name: 'dateFrom', required: false, type: String })
  @ApiQuery({ name: 'dateTo', required: false, type: String })
  async getGenderChart(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const filters: MonitorFilters = { dateFrom, dateTo };
    return await this.monitorService.getGenderChart(filters);
  }

  /**
   * B5: جلب العدد الإجمالي للفيديوهات والصور على المنصة
   * GET /monitor/content/media-count
   */
  @Get('content/media-count')
  @ApiOperation({
    summary: 'جلب العدد الإجمالي للفيديوهات والصور على المنصة',
    description: 'العدد الإجمالي للصور والعدد الإجمالي للفيديوهات',
  })
  @ApiQuery({ name: 'dateFrom', required: false, type: String })
  @ApiQuery({ name: 'dateTo', required: false, type: String })
  async getMediaCount(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const filters: MonitorFilters = { dateFrom, dateTo };
    return await this.monitorService.getMediaCount(filters);
  }

  /**
   * B6: جلب قائمة بأكثر 10 أو 20 منشوراً تفاعلاً
   * GET /monitor/content/top-engagement
   */
  @Get('content/top-engagement')
  @ApiOperation({
    summary: 'جلب قائمة بأكثر 10 أو 20 منشوراً تفاعلاً',
    description: 'تفاعلاً (بطريقة تتابُعياً حسب مجموع الإعجابات والتعليقات)',
  })
  @ApiQuery({ name: 'dateFrom', required: false, type: String })
  @ApiQuery({ name: 'dateTo', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'عدد المنشورات (افتراضي: 10)' })
  async getTopEngagement(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('limit') limit?: string,
  ) {
    const filters: MonitorFilters = { dateFrom, dateTo };
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return await this.monitorService.getTopEngagement(filters, limitNumber);
  }

  /**
   * B7: جلب بيانات الرسم البياني الدائري لتوزيع المستخدمين أو المنشورات حسب نوع الرياضة
   * GET /monitor/charts/sports
   */
  @Get('charts/sports')
  @ApiOperation({
    summary: 'جلب بيانات الرسم البياني الدائري',
    description: 'لتوزيع المستخدمين أو المنشورات حسب نوع الرياضة كنسب مئوية',
  })
  @ApiQuery({ name: 'dateFrom', required: false, type: String })
  @ApiQuery({ name: 'dateTo', required: false, type: String })
  async getSportsChart(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const filters: MonitorFilters = { dateFrom, dateTo };
    return await this.monitorService.getSportsChart(filters);
  }
}

