import * as _ from 'lodash';
export class Common {
  static valueToBoolean(value: any) {
    if (value === null || value === undefined) {
      return undefined;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
      return true;
    }
    if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
      return false;
    }
    return undefined;
  }

  // static translateObjectMapping(object_name) {
  //   const news = [
  //     'CreateNewsDTO',
  //     'UpdateNewsDTO',
  //     'UpdateStatusNewsDTO',
  //     'FindNewsDTO',
  //   ];
  //   if (news.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.NEWS;
  //   }

  //   const user = [
  //     'CreateUserDTO',
  //     'FindUserDTO',
  //     'UpdateProfileDTO',
  //     'UpdateUserDTO',
  //     'UpdateUserStatusDTO',
  //     'UpdateMoveUserDTO',
  //     'UpdateOffUserDTO',
  //     'ProfileDTO',
  //     'UpdateReplaceUserDTO',
  //     'UpdateUserGroupDTO',
  //   ];
  //   if (user.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.USER;
  //   }

  //   const company = [
  //     'CreateCompanyDTO',
  //     'CreateLocationDTO',
  //     'FindCompanyDTO',
  //     'UpdateStatusCompanyDTO',
  //     'UpdateCompanyDTO',
  //   ];
  //   if (company.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.COMPANY;
  //   }

  //   const distributor = [
  //     'CreateDistributorDTO',
  //     'FindDistributorDTO',
  //     'UpdateDistributorDTO',
  //     'FindDistributorsToOrderDTO',
  //   ];
  //   if (distributor.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.DISTRIBUTOR;
  //   }

  //   const store = [
  //     'CreateStoreDTO',
  //     'FindStoreDTO',
  //     'FindStoreGeolocationDTO',
  //     'UpdateStoreDTO',
  //     'UpdateStoreBySaleDTO',
  //     'UpdateStoreStatusDTO',
  //     'UpdateOffStoreDTO',
  //   ];
  //   if (store.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.STORE;
  //   }

  //   const album = ['CreateAlbumDTO', 'FindAlbumDTO', 'UpdateAlbumDTO'];
  //   if (album.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.ALBUM;
  //   }

  //   const brand = ['CreateBrandDTO', 'FindBrandDTO', 'UpdateBrandDTO'];
  //   if (brand.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.BRAND;
  //   }

  //   const business = [
  //     'CreateTasksDTO',
  //     'RealRouteStoreDTO',
  //     'CreateCheckinStoreDTO',
  //     'CreateCheckoutStoreDTO',
  //     'CreateTaskDTO',
  //     'FindBusinessDTO',
  //     'FindRealRouteDTO',
  //     'FindRealRouteByStoreDTO',
  //     'FindTaskDTO',
  //     'UpdateTasksDTO',
  //     'UpdateBusinessStatusDTO',
  //     'UpdateFinishRealRouteDTO',
  //     'UpdateTaskDTO',
  //     'UpdateTaskStatusDTO',
  //     'CreateBusinessDTO',
  //     'FindBusinessTaskHistoryDTO',
  //     'FindVisitStoreByUserReportDTO',
  //     'UpdateRealRouteDTO',
  //   ];
  //   if (business.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.BUSINESS;
  //   }

  //   const category = [
  //     'CreateCategoryDTO',
  //     'FindCategoryDTO',
  //     'UpdateCategoryDTO',
  //   ];
  //   if (category.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.CATEGORY;
  //   }

  //   const geolocation = [
  //     'CreateGeolocationDTO',
  //     'CreateGeolocationByIdDTO',
  //     'CreatePointDTO',
  //     'FindGeolocationDTO',
  //   ];
  //   if (geolocation.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.GEOLOCATION;
  //   }

  //   const group = [
  //     'CreateGroupDTO',
  //     'FindGroupDTO',
  //     'UpdateGroupDTO',
  //     'UpdateStatusGroupDTO',
  //     'CreateAreaGroupDTO',
  //     'FindAreaGroupDTO',
  //     'UpdateAreaGroupDTO',
  //   ];
  //   if (group.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.GROUP;
  //   }

  //   const inventory = [
  //     'CreateInventoryDTO',
  //     'FindInventoryDTO',
  //     'ProductDTO',
  //     'ProductVariantDTO',
  //     'UpdateInventoryDTO',
  //     'PushInventoryDTO',
  //     'ThirdPartyCreateInventoryDTO',
  //   ];
  //   if (inventory.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.INVENTORY;
  //   }

  //   // const kpi = [
  //   //   'CreateKpisDTO',
  //   //   'CreateKpiPointDTO',
  //   //   'CreateKpiTargetDTO',
  //   //   'FindKpiIndicatorGroupDTO',
  //   //   'FindKpiTargetDTO',
  //   //   'ReportMainKPIDTO',
  //   //   'KpiProductDTO',
  //   //   'KpiProductDetailDTO',
  //   //   'UpdateKpiDTO',
  //   //   'UpdateKpiIndicatorGroupDTO',
  //   //   'UpdateKpiStatusDTO',
  //   //   'UpdateKpiTargetDTO',
  //   //   'UpdateStatusKpiIndicatorGroupDTO',
  //   //   'UpdateStatusKpiTargetDTO',
  //   //   'CreateManyKpiIndicatorDTO',
  //   //   'AssignCategoriesDTO',
  //   //   'CreateKpiDailyTargetDTO',
  //   // ];
  //   // if (kpi.indexOf(object_name) !== -1) {
  //   //   return ENUM_MODEL.KPI;
  //   // }

  //   const kpi_indicator = [
  //     'FindKpiIndicatorDTO',
  //     'CreateKpiIndicatorDTO',
  //     'UpdateKpiIndicatorDTO',
  //     'UpdateStatusKpiIndicatorDTO',
  //     'DeleteKpiIndicatorByCodesDTO',
  //     'CloneKpiIndicatorCompanyDTO',
  //   ];
  //   if (kpi_indicator.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.KPI_INDICATOR;
  //   }

  //   const kpi_indicator_group = [
  //     'FindKpiIndicatorGroupDTO',
  //     'CreateKpiIndicatorGroupDTO',
  //     'UpdateKpiIndicatorGroupDTO',
  //   ];
  //   if (kpi_indicator_group.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.KPI_INDICATOR;
  //   }

  //   const kpi_target = [
  //     'FindKpiTargetDTO',
  //     'CreateKpiTargetDTO',
  //     'UpdateKpiTargetDTO',
  //     'ReportPortalKpiCategoriesDTO',
  //     'ReportPortalKpiDTO',
  //   ];
  //   if (kpi_target.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.KPI_INDICATOR;
  //   }

  //   const kpi_daily_target = [
  //     'FindKpiDailyTargetDTO',
  //     'FindCheckedUsersKpiDailyTargetDTO',
  //     'CreateKpiDailyTargetDTO',
  //   ];
  //   if (kpi_daily_target.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.KPI_INDICATOR;
  //   }

  //   const apply_times = ['ApplyTimesDTO'];
  //   if (apply_times.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.APPLY_TIMES;
  //   }

  //   const location = [];
  //   if (location.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.LOCATION;
  //   }

  //   const map_location = [
  //     'FindMapLocationDTO',
  //     'MapLocationDTO',
  //     'MapLocationSocketDTO',
  //   ];
  //   if (map_location.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.MAP_LOCATION;
  //   }

  //   const notify = [
  //     'CreateNotifyDTO',
  //     'CreateNotifySendDTO',
  //     'FindNotifyDTO',
  //     'FindNotifySendDTO',
  //     'UpdateNotifyDTO',
  //   ];
  //   if (notify.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.NOTIFY;
  //   }

  //   const order = [
  //     'CalculateOrderAmountDTO',
  //     'CalculateOrderAmountProductDTO',
  //     'CreateOrderDTO',
  //     'FindOrderDTO',
  //     'OrderProductDTO',
  //     'OrderProductVariantDTO',
  //     'PushOrderToEcomDTO',
  //     'PushOrderToEcomProductDTO',
  //     'PushOrderDTO',
  //     'ReportBusinessVisitStoreDTO',
  //     'CreateOrderThirdPartyDTO',
  //   ];
  //   if (order.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.ORDER;
  //   }

  //   const production = [
  //     'CreateProductDTO',
  //     'FindProductDTO',
  //     'UpdateProductDTO',
  //     'UpdateProductStatusDTO',
  //   ];
  //   if (production.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.PRODUCT;
  //   }

  //   const route = [
  //     'RouteStoresDTO',
  //     'FindRouteDTO',
  //     'UpdateRouteDTO',
  //     'CreateRouteDTO',
  //   ];
  //   if (route.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.ROUTE;
  //   }

  //   const supplier = ['CreateSupplierDTO', 'UpdateSupplierDTO'];
  //   if (supplier.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.SUPPLIER;
  //   }

  //   const survey = [
  //     'CreateSurveyDTO',
  //     'CreateSurveyDataDTO',
  //     'FindSurveyDTO',
  //     'QuestionDTO',
  //     'UpdateSurveyDTO',
  //     'UpdateSurveyStatusDTO',
  //     'UpdateSurveyDataDTO',
  //   ];
  //   if (survey.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.SURVEY;
  //   }

  //   const ticket = [
  //     'CreateTicketDTO',
  //     'CreateTicketAnswerDTO',
  //     'FindTicketDTO',
  //     'MessageData',
  //   ];
  //   if (ticket.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.TICKET;
  //   }

  //   const working_time = [
  //     'DayOffSpecialDTO',
  //     'FindWorkingTimesDTO',
  //     'UpdateStatusWorkingTimesDTO',
  //     'UpdateWorkingTimesDTO',
  //     'CreateWorkingTimesDTO',
  //   ];
  //   if (working_time.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.WORKING_TIMES;
  //   }

  //   const working_time_data = [
  //     'CreateCheckinWorkingTimesDataDto',
  //     'CreateCheckoutWorkingTimesDataDto',
  //     'FindWorkingTimesDataDTO',
  //   ];
  //   if (working_time_data.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.WORKING_TIMES_DATA;
  //   }
  //   const working_time_leave = [
  //     'CreateLeaveWorkingTimesDTO',
  //     'UpdateStatusWorkingTimesLeaveDTO',
  //     'UpdateDateTimeWorkingTimesLeaveDTO',
  //     'FindWorkingTimesLeaveDTO',
  //     'CreateWorkingTimesHalfDayDTO',
  //     'CreateWorkingTimesSoonDTO',
  //     'CreateWorkingTimesLateDTO',
  //   ];
  //   if (working_time_leave.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.WORKING_TIMES_LEAVE;
  //   }
  //   const setting = [
  //     'CreateSettingDTO',
  //     'FindSettingDTO',
  //     'UpdateSettingDTO',
  //     'UpdateSettingMultiplyDTO',
  //   ];
  //   if (setting.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.SETTING;
  //   }

  //   const menu = [
  //     'CreateMenuDTO',
  //     'FindMenuDTO',
  //     'CreateMenuDTO',
  //     'UpdateMenuDTO',
  //   ];
  //   if (menu.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.MENU;
  //   }

  //   const role = ['CreateRoleDTO', 'FindRoleDTO', 'UpdateRoleDTO'];
  //   if (role.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.ROLE;
  //   }

  //   const visit_store = ['FindRealRouteByUserDTO'];
  //   if (visit_store.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.VISIT_STORE;
  //   }
  //   const assign_route = [
  //     'FindAssignRouteDto',
  //     'CreatedAssignRouteDto',
  //     'UpdateAssignRouteDto',
  //   ];
  //   if (assign_route.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.ASSIGN_ROUTE;
  //   }

  //   const promotion = ['FindPromotionDTO', 'FindPromotionForOrderDTO'];
  //   if (promotion.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.PROMOTION;
  //   }

  //   const asset = [
  //     'CreateAssetDto',
  //     'FindAssetDTO',
  //     'CreateImportAssetDto',
  //     'UpdateAssetStatusDTO',
  //     'UpdateAssetDto',
  //     'CreateExportAssetDto',
  //     'CreateAssetFromKidoDto',
  //     'CreateAssetsDto',
  //   ];
  //   if (asset.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.ASSET;
  //   }

  //   const verify_asset = ['CreateVerifyAssetDto', 'FindAssetVerifyDTO'];
  //   if (verify_asset.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.ASSET_VERIFY;
  //   }
  //   const syncHistory = ['UpdateSyncHistoryDTO'];
  //   if (syncHistory.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.SYNC;
  //   }

  //   const sync = [
  //     'UpdateStoreQrcodeMappingCodeDto',
  //     'ecoPayUpdateInternalQrcodeUpdateDto',
  //     'ecoPayUpdateInternalQrcodeMappingDto',
  //   ];
  //   if (sync.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.SYNC;
  //   }

  //   const event = ['FindEventDTO', 'EventDTO', 'UpdateEventStatusDTO'];
  //   if (event.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.EVENT;
  //   }

  //   const assetInventory = ['CreateInventoryDto'];
  //   if (assetInventory.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.ASSET_INVENTORY;
  //   }

  //   const masterData = [
  //     'FindMasterDataDTO',
  //     'CreateMasterDataDto',
  //     'UpdateMasterDataDto',
  //   ];
  //   if (masterData.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.MASTER_DATA;
  //   }
  //   const groupProduct = [
  //     'FindGroupProductDTO',
  //     'CreateGroupProductDTO',
  //     'UpdateGroupProductDTO',
  //   ];
  //   if (groupProduct.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.GROUP_PRODUCT;
  //   }

  //   const thirdParty = ['FindWorkingTimesByCompanyDTO'];
  //   if (thirdParty.indexOf(object_name) !== -1) {
  //     return ENUM_MODEL.THIRD_PARTY;
  //   }
  // }

  static detectNullToObject(value) {
    return _.isEmpty(value) ? {} : value;
  }
}
