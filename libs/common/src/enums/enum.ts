export enum ENVIRONMENT_PARAM {
  ENVIRONMENT = 'ENVIRONMENT',
  IS_DEBUG = 'IS_DEBUG',
  FIREBASE_PROJECT_ID = 'FIREBASE_PROJECT_ID',
  FIREBASE_PRIVATE_KEY = 'FIREBASE_PRIVATE_KEY',
  FIREBASE_CLIENT_EMAIL = 'FIREBASE_CLIENT_EMAIL',
  FIREBASE_DATABASE = 'FIREBASE_DATABASE',
  KEYCLOAK_BASE_URL = 'KEYCLOAK_BASE_URL',
  KEYCLOAK_REAL_NAME = 'KEYCLOAK_REAL_NAME',
  KEYCLOAK_CLIENT_UNIQUE_ID = 'KEYCLOAK_CLIENT_UNIQUE_ID',
  KEYCLOAK_CLIENT_ID = 'KEYCLOAK_CLIENT_ID',
  KEYCLOAK_CLIENT_SECRET = 'KEYCLOAK_CLIENT_SECRET',
  CLIENT_URL = 'CLIENT_URL',
  SERVER_URL = 'SERVER_URL',
  ECOMV2_URL = 'ECOMV2_URL',
  ECOMV2_TOKEN = 'ECOMV2_TOKEN',
  JSREPORT_PREVIEW_FILE_URL = 'JSREPORT_PREVIEW_FILE_URL',
  ECOPAY_QRCODE_URL = 'ECOPAY_QRCODE_URL',
  ECOPAY_QRCODE_PUBLIC_URL = 'ECOPAY_QRCODE_PUBLIC_URL',
  SERVER_REQUEST_TIMEMOUT = 'SERVER_REQUEST_TIMEMOUT',
  AI_URL = 'AI_URL',
  SOCKET_URL = 'SOCKET_URL',
  PORTAL_PORT = 'PORTAL_PORT',
  SOCKET_PORT = 'SOCKET_PORT',
  REPORT_READ_PORT = 'REPORT_READ_PORT',
  SYNC_PORT = 'SYNC_PORT',
  HISTORY_PORT = 'HISTORY_PORT',
  CRONJOB_PORT = 'CRONJOB_PORT',
  APP_PORT = 'APP_PORT',
  CLOUD_PORT = 'CLOUD_PORT',
  STORAGE_PORT = 'STORAGE_PORT',
  REPORT_WRITE_PORT = 'REPORT_WRITE_PORT',
  REPORT_KPI_PORT = 'REPORT_KPI_PORT',
  SCHEDULER_PORT = 'SCHEDULER_PORT',
  MESSAGE_PORT = 'MESSAGE_PORT',
  MAX_REPORT_PER_EXCEL = 'MAX_REPORT_PER_EXCEL',
  MAX_ITEM_PER_ZIP_FILE = 'MAX_ITEM_PER_ZIP_FILE',
  MAX_REPORT_ROW = 'MAX_REPORT_ROW',
  MAX_REPORT_PER_QUERY = 'MAX_REPORT_PER_QUERY',
  MAX_IMPORT_ROW = 'MAX_IMPORT_ROW',
  MAX_REPORT_ROW_SAVE = 'MAX_REPORT_ROW_SAVE',
  MAX_POOL_SIZE = 'MAX_POOL_SIZE',
  ENABLE_SCHEDULER_EVENT = 'ENABLE_SCHEDULER_EVENT',
  ENABLE_SCHEDULER_EVENT_ACCUMULATE = 'ENABLE_SCHEDULER_EVENT_ACCUMULATE',
  ENABLE_CRON_JOB_STOTE_CHECK_LOCATION = 'ENABLE_CRON_JOB_STOTE_CHECK_LOCATION',
  ENABLE_CRON_JOB_ZIP_FILE_THIRD_PARTY = 'ENABLE_CRON_JOB_ZIP_FILE_THIRD_PARTY',
  ENABLE_CRON_JOB_QRCODE_ECOPAY = 'ENABLE_CRON_JOB_QRCODE_ECOPAY',
  ENABLE_CRON_JOB_REMOVE_DUPLICATE_PLAN_ROUTE = 'ENABLE_CRON_JOB_REMOVE_DUPLICATE_PLAN_ROUTE',
  ECOPAY_COMPANY_CODE = 'ECOPAY_COMPANY_CODE',
  COMPANY_CODE = 'COMPANY_CODE',
  RMQ_URI = 'RMQ_URI',
  ASYNC_POOL = 'ASYNC_POOL',
  JSREPORT_BASE_URL = 'JSREPORT_BASE_URL',
  PROCESS_PER_ASYNC_POOL = 'PROCESS_PER_ASYNC_POOL',
  JSREPORT_USERNAME = 'JSREPORT_USERNAME',
  JSREPORT_PASSWORD = 'JSREPORT_PASSWORD',
  PROCESS_PER_PROMISE = 'PROCESS_PER_PROMISE',
  MONGO_URI = 'MONGO_URI',
  MONGO_URI_READONLY = 'MONGO_URI_READONLY',
  MONGO_REPORT_URI = 'MONGO_REPORT_URI',
  MONGO_REPORT_URI_READONLY = 'MONGO_REPORT_URI_READONLY',
  ENABLE_TELEGRAM_CUSTOMER_SERVICE = 'ENABLE_TELEGRAM_CUSTOMER_SERVICE',
  ECOPAY_TOKEN = 'ECOPAY_TOKEN',
  TELEGRAM_GROUP_ID = 'TELEGRAM_GROUP_ID',
  TEMPLATE_FILE_PATH = 'TEMPLATE_FILE_PATH',
  ALL_TOPIC_NOTIFY = 'ALL_TOPIC_NOTIFY',
  GOOGLE_MAPS_HOST = 'GOOGLE_MAPS_HOST',
  GOOGLE_MAPS_PATH = 'GOOGLE_MAPS_PATH',
  SERVER_MEDIA_URL = 'SERVER_MEDIA_URL',
  THIRD_PARTY_EXTERNAL_PORT = 'THIRD_PARTY_EXTERNAL_PORT',
  ASSET_PORT = 'ASSET_PORT',
  QUEUE_HOST = 'QUEUE_HOST',
  QUEUE_PORT = 'QUEUE_PORT',
  QUEUE_PASSWORD = 'QUEUE_PASSWORD',
  DEFAULT_PASSWORD = 'DEFAULT_PASSWORD',
  REPORT_PORT = 'REPORT_PORT',
  DELAY_EXPORT_FILE_SECOND = 'DELAY_EXPORT_FILE_SECOND',
  GOONG_MAPS_HOST = 'GOONG_MAPS_HOST',
  GOONG_MAPS_KEY = 'GOONG_MAPS_KEY',
  GOONG_MAPS_PATH = 'GOONG_MAPS_PATH',
  USER_SYSTEM_SYNC = 'USER_SYSTEM_SYNC',
  TTL_KEY_QUEUE = 'TTL_KEY_QUEUE',
  KEYCLOAK_COOKIE_KEY = 'KEYCLOAK_COOKIE_KEY',
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRES_IN = 'JWT_EXPIRES_IN',
  ENABLE_CRON_JOB_BACKUP_SUMMARY = 'ENABLE_CRON_JOB_BACKUP_SUMMARY',
  REPORT_SYNC_PORT = 'REPORT_SYNC_PORT',
  INSTANCE_SYNC_DATA_MASTER_DATA = 'INSTANCE_SYNC_DATA_MASTER_DATA',
  INSTANCE_SYNC_DATA_STORE = 'INSTANCE_SYNC_DATA_STORE',
  INSTANCE_SYNC_DATA_ROUTE = 'INSTANCE_SYNC_DATA_ROUTE',
  INSTANCE_SYNC_DATA_CHECKSUM = 'INSTANCE_SYNC_DATA_CHECKSUM',
  INSTANCE_SYNC_DATA_EVENT = 'INSTANCE_SYNC_DATA_EVENT',
  INSTANCE_SYNC_DATA_ORDER = 'INSTANCE_SYNC_DATA_ORDER',
  OMICALL_API_KEY = 'OMICALL_API_KEY',
  ENABLE_CHANGE_STREAM = 'ENABLE_CHANGE_STREAM',
}

export enum CONNECTION_NAME {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  PRIMARY_REPORT = 'PRIMARY_REPORT',
  SECONDARY_REPORT = 'SECONDARY_REPORT',
}

export enum ENUM_MODEL {
  AUTH = 'AUTH',
  USER = 'USER',
  COMPANY = 'COMPANY',
  DISTRIBUTOR = 'DISTRIBUTOR',
  STORE = 'STORE',
  ROLE = 'ROLE',
  GROUP = 'GROUP',
  BRAND = 'BRAND',
  CATEGORY = 'CATEGORY',
  SUPPLIER = 'SUPPLIER',
  PRODUCT = 'PRODUCT',
  ORDER = 'ORDER',
  NEWS = 'NEWS',
  WORKING_TIMES = 'WORKING_TIMES',
  WORKING_TIMES_DATA = 'WORKING_TIMES_DATA',
  WORKING_TIMES_LEAVE = 'WORKING_TIMES_LEAVE',
  WORKING_TIMES_LATE = 'WORKING_TIMES_LATE',
  KPI = 'KPI',
  TICKET = 'TICKET',
  TASK = 'TASK',
  BUSINESS = 'BUSINESS',
  ROUTE = 'ROUTE',
  // REPORT_ROUTE = 'REPORT_ROUTE',
  MAP_LOCATION = 'MAP_LOCATION',
  ALBUM = 'ALBUM',
  INVENTORY = 'INVENTORY',
  KPI_INDICATOR = 'KPI_INDICATOR',
  KPI_INDICATOR_GROUP = 'KPI_INDICATOR_GROUP',
  KPI_TARGET = 'KPI_TARGET',
  KPI_DAILY_TARGET = 'KPI_DAILY_TARGET',
  SURVEY = 'SURVEY',
  SURVEY_DATA = 'SURVEY_DATA',
  REPORT = 'REPORT',
  SYNC = 'SYNC',
  SYNC_HISTORY = 'SYNC_HISTORY',
  VISIT_STORE = 'VISIT_STORE',
  NOTIFY = 'NOTIFY',
  GEOLOCATION = 'GEOLOCATION',
  LOCATION = 'LOCATION',
  SETTING = 'SETTING',
  MENU = 'MENU',
  EMPLOYEE_MONITORING = 'EMPLOYEE_MONITORING',
  STORE_CONFIG_FIELDS = 'STORE_CONFIG_FIELDS',
  THIRD_PARTY = 'THIRD_PARTY',
  AREA_GROUP = 'AREA_GROUP',
  RULE = 'RULE',
  CHAT = 'CHAT',
  IMPORT = 'IMPORT',
  ASSIGN_ROUTE = 'ASSIGN_ROUTE',
  PROMOTION = 'PROMOTION',
  ACTION_HISTORY = 'ACTION_HISTORY',
  EVENT_OVERVIEW = 'EVENT_OVERVIEW',
  EVENT = 'EVENT',
  EVENT_PARTICIPANT = 'EVENT_PARTICIPANT',
  EVENT_PARTICIPANT_PROCESS = 'EVENT_PARTICIPANT_PROCESS',
  EVENT_PARTICIPANT_REVIEW = 'EVENT_PARTICIPANT_REVIEW',
  EVENT_REWARD = 'EVENT_REWARD',
  MASTER_DATA = 'MASTER_DATA',

  /**
   * ASSET  MODULE
   */
  ASSET = 'ASSET',
  ASSET_INVENTORY_IDENTITY = 'ASSET_INVENTORY_IDENTITY',
  ASSET_ASSIGN = 'ASSET_ASSIGN',
  ASSET_VERIFY = 'ASSET_VERIFY',

  ASSET_INVENTORY = 'ASSET_INVENTORY', // OLD
  ASSET_DELIVERY = 'ASSET_DELIVERY', // OLD
  ASSET_RECALL = 'ASSET_RECALL', // OLD
  ASSET_EXPORT = 'ASSET_EXPORT', // OLD
  ASSET_IMPORT = 'ASSET_IMPORT', // OLD
  /**
   * END ASSET  MODULE
   */

  // HISTORY = 'HISTORY',
  ASSET_STORE = 'ASSET_STORE',
  NOTE = 'NOTE',
  GROUP_PRODUCT = 'GROUP_PRODUCT',
  ASSET_REQUEST = 'ASSET_REQUEST',
  ASSET_USER = 'ASSET_USER',
  RECALL_PRODUCT = 'RECALL_PRODUCT',
  VISIT_RESULT_KIDO = 'VISIT_RESULT_KIDO',
  VISIT_DETAIL_KIDO = 'VISIT_DETAIL_KIDO',
  VISIT_PLAN_KIDO = 'VISIT_PLAN_KIDO',
  ORDER_STATUS_KIDO = 'ORDER_STATUS_KIDO',
  RAW_DATA_KIDO = 'RAW_DATA_KIDO',
  PROGRAM_INDUSTRY = 'PROGRAM_INDUSTRY',
  PROGRAM_LINE = 'PROGRAM_LINE',
  ASM_KIDO = 'ASM_KIDO',
  RSM_KIDO = 'RSM_KIDO',
  KPI_TARGET_SUMMARY = 'KPI_TARGET_SUMMARY',
  EXPORT = 'EXPORT',
  EXPORT_FILE = 'EXPORT_FILE',
  COMPLIANCE_KIDO = 'COMPLIANCE_KIDO',
  CUMULATIVE_COMPLIANCE_KIDO = 'CUMULATIVE_COMPLIANCE_KIDO',
  BUSINESS_RESULT_KIDO = 'BUSINESS_RESULT_KIDO',
  AGENT_BUSINESS_RESULT_KIDO = 'AGENT_BUSINESS_RESULT_KIDO',
  DAILY_MONITOR_TRACKING = 'DAILY_MONITOR_TRACKING',
  SUPERVISION_EMPLOYEES = 'SUPERVISION_EMPLOYEES',
  SOCKET = 'SOCKET',
  APPLY_TIMES = 'APPLY_TIMES',
  REPORT_KPI_SUMMARY_DAILY = 'REPORT_KPI_SUMMARY_DAILY',
  REPORT_KPI_SUMMARY_MONTHLY = 'REPORT_KPI_SUMMARY_MONTHLY',
  REPORT_KPI_SUMMARY_MONTH = 'REPORT_KPI_SUMMARY_MONTH',
  LOYALTY = 'LOYALTY',
  QRCODE_DATA = 'QRCODE_DATA',
  REAL_ROUTE = 'REAL_ROUTE',
  COMPANY_THIRD_PARTY = 'COMPANY_THIRD_PARTY',
  COMPANY_THIRD_PARTY_STORE = 'COMPANY_THIRD_PARTY_STORE',
  COMPANY_THIRD_PARTY_DISTRIBUTOR = 'COMPANY_THIRD_PARTY_DISTRIBUTOR',
  EVENT_ACCUMULATE_OVERVIEW = 'EVENT_ACCUMULATE_OVERVIEW',
  EVENT_ACCUMULATE = 'EVENT_ACCUMULATE',
  EVENT_ACCUMULATE_PARTICIPANT = 'EVENT_ACCUMULATE_PARTICIPANT',
  EVENT_ACCUMULATE_PROCESS = 'EVENT_ACCUMULATE_PROCESS',
  EVENT_ACCUMULATE_REWARD = 'EVENT_ACCUMULATE_REWARD',
  PERMISSION = 'PERMISSION',
  KEYCLOARK_SYNC = 'KEYCLOARK_SYNC',
  ACL = 'ACL',

  VISITING_PLAN_REPORT = 'VISITING_PLAN_REPORT',
  VISITED_DETAIL_REPORT = 'VISITED_DETAIL_REPORT',
  DAILY_SALE_TRACKING_REPORT = 'DAILY_SALE_TRACKING_REPORT',
  VISITED_GENERAL_REPORT = 'VISITED_GENERAL_REPORT',
  DAILY_OBEDIENCE_REPORT = 'DAILY_OBEDIENCE_REPORT',
  ACCUMULATED_OBEDIENCE_REPORT = 'ACCUMULATED_OBEDIENCE_REPORT',
  ORDER_STATUS_REPORT = 'ORDER_STATUS_REPORT',
  ORDER_BY_OT_REPORT = 'ORDER_BY_OT_REPORT',
  BUSINESS_RESULT_BY_AGENCY_REPORT = 'BUSINESS_RESULT_BY_AGENCY_REPORT',
  BUSINESS_RESULT_BY_COVERING_REPORT = 'BUSINESS_RESULT_BY_COVERING_REPORT',
  DAY_RESULT_REPORT = 'DAY_RESULT_REPORT',
  MONTH_RESULT_REPORT = 'MONTH_RESULT_REPORT',
  ASM_REPORT = 'ASM_REPORT',
  RSM_REPORT = 'RSM_REPORT',
  WORKING_TIME_TRACKING_REPORT = 'WORKING_TIME_TRACKING_REPORT',
  KPI_REPORT = 'KPI_REPORT',
  USER_HIERACHICAL_STRUCTURE_REPORT = 'USER_HIERACHICAL_STRUCTURE_REPORT',
  USER_NOTE_REPORT = 'USER_NOTE_REPORT',
  KPI_SUMMARY_DAILY = 'KPI_SUMMARY_DAILY',
  USER_AGENT = 'USER_AGENT',
  AI = 'AI',
  ECONTRACT = 'ECONTRACT',
  REPORT_ORDER_DETAIL = 'REPORT_ORDER_DETAIL',
  COMPRESS_REPORT = 'COMPRESS_REPORT',
  CALENDAR = 'CALENDAR',
  FREQUENCY_TYPE = 'FREQUENCY_TYPE',
  FREQUENCY_SET = 'FREQUENCY_SET',
  PROCESS_IMPORT = 'PROCESS_IMPORT',
  REPORT_HISTORY = 'REPORT_HISTORY',
  REPORT_SYNC = 'REPORT_SYNC',
  PROVINCE = 'PROVINCE',
  DISTRICT = 'DISTRICT',
  WARD = 'WARD',
  CHECK_SUM_DATA = 'CHECK_SUM_DATA',
  REPORT_SYNC_HISTORIES = 'REPORT_SYNC_HISTORIES',
}
