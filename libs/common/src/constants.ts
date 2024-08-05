export const GENDER = [
  { id: 'MALE', name: 'Nam' },
  { id: 'FEMALE', name: 'Nữ' },
];

export const BUSINESS_TYPE = [
  { id: 0, name: 'Cửa hàng sim thẻ' },
  { id: 1, name: 'Điện thoại di động' },
  { id: 2, name: 'Thiết bị điện tử' },
  { id: 3, name: 'Đồ gia dụng' },
  { id: 4, name: 'Xe máy' },
  { id: 5, name: 'Tiệm vàng' },
  { id: 6, name: 'Tạp hóa' },
  { id: 7, name: 'Internet' },
  { id: 8, name: 'Nhà thuốc' },
  { id: 9, name: 'Cửa hàng thời trang' },
  { id: 10, name: 'Cửa hàng mỹ phẩm' },
  { id: 11, name: 'Cửa hàng gạo Tân Long' },
  { id: 100, name: 'Loại hình khác' },
];

// export const TRANS_ORDER_STATUS = [
//   { key: 'INIT', value: 'Đã lên đơn' },
//   { key: 'CONFIRMED_CUSTOMER', value: 'Đã xác nhận mua' },
//   { key: 'CONFIRMED', value: 'Đã xác nhận bán' },
//   { key: 'PACKING', value: 'Đang đóng gói' },
//   { key: 'EXPORTED_WAREHOUSE', value: 'Đã xuất kho' },
//   { key: 'SHIPPING', value: 'Đang giao hàng' },
//   { key: 'DELIVERIED', value: 'Đã giao hàng' },
//   { key: 'PROCESSING', value: 'Đang xử lý' },
//   { key: 'SUCCESS', value: 'Thành công' },
//   { key: 'CANCEL', value: 'Thất bại' },
// ];

export const ORDER_GROUP_STATUS = [
  {
    key: 'PROCESSING',
    value: [
      'INIT',
      'APPROVED',
      // 'CONFIRMED_CUSTOMER',
      // 'CONFIRMED',
      //
      // 'PACKING',
      // 'EXPORTED_WAREHOUSE',
      // 'SHIPPING',
      // 'DELIVERIED',
      'PROCESSING',
    ],
  },
  {
    key: 'SUCCESS',
    value: ['SUCCESS'],
  },
  {
    key: 'FAIL',
    value: ['CANCEL'],
  },
];

/*
export const ORDER_GROUP_STATUS_A = [
  {
    "PROCESSING": [
      'INIT',
      'CONFIRMED_CUSTOMER',
      'CONFIRMED',
      //
      'PACKING',
      'EXPORTED_WAREHOUSE',
      'SHIPPING',
      'DELIVERIED',
      'PROCESSING'
    ]
  },
  {
    "SUCCESS": [
      'RECEIVED'
    ]
  },
  {
    "FAIL": [
      'CANCEL'
    ]
  }
]
*/

export const APPLY_TIMES_TRANS = {
  DAY: 'Ngày Thứ',
  WEEK: 'Tuần Thứ',
  MONTH: 'Tháng Thứ',
};

export const ORDER_TRANS_STATUS_CONST = {
  INIT: 'Khởi tạo',
  APPROVED: 'Đã duyệt',
  PROCESSING: 'Đang xử lý',
  SUCCESS: 'Thành công',
  CANCEL: 'Thất bại',
};

export const ACTION_HISTORY_TRANS_STATUS = {
  WAITING: 'Đang chờ xử lý',
  SUCCESS: 'Thành công',
  FAILED: 'Thất bại',
};

export const DEFAULT_WORKING_TIME = 26;

export const ECOM_V2_ORG_FIELD = {
  FROM_CODE: {
    from: 'from_code',
    to: 'reference_third_party_code',
  },
  FROM_NAME: {
    from: 'from_name',
    to: 'reference_third_party_name',
  },
};

export const MONGO_ARRAY_FIELDS = ['area_groups', 'groups', 'users', 'roles'];
export const MONGO_FIELDS = [
  'area_group',
  'group',
  'company',
  'user',
  'role',
  '_id',
  'store',
];
export const ROUTE_DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];
export const FREQUENCIES = ['W1', 'W2', 'W3', 'W4', 'W5'];

export const MOBILE_PLATFORM = ['android', 'ios'];

export const COMPANY_ID_CODE = {
  '5f8e4f8a266d7225a5da3c86': 'FVC', // FINVIET
  '62bdab839609430ccea7ffb3': 'FTC', // FINVIET - Phòng Tài Chính
  '63b7a59d728ae72624cd70a8': 'ABI', // AB InBev
  '62be5b349609430ccea80880': 'KPP', // FINVIET - Kênh Phân Phối
  '62c284b4aa5e77ffde086094': 'EDM', // ECO - Điện máy
  '62c2850d56aa22bc85ccd9db': 'BMT', // Brand Mekong Trading
  '640af000abef28b8ce9a5191': 'NTC', // Nutricare
  '63170e5ac5566a1ee94878e6': 'GSK', // BRAND TEST
  '62c266dbaa5e77ffde085b13': 'EVT', // ECO - Dịch Vụ Viễn Thông
  '6438bb15e3b3739d52086c4c': 'FVT', // FINVIET - Dịch Vụ Viễn Thông
  '64226be063c06f7e696537ba': 'THP', // THP Brand
} as const;

export const AUTO_CHECKOUT_AT = '23:59:59';

export const ECOMV2_PATH = {
  DETAIL_COMPANY: '/v1/companies/',
  COMPANIES: '/v1/companies',
  ORG_PROFILES_BY_COMPANY: '/v1/profiles/company',
  UPDATE_ORG_PROFILE: '/v1/company-profiles',
  PROFILE_COMPANY: '/v1/profiles/company/',
  SYNC_ORG_PROFILE_TO_ECOM: '/v1/profile/sync-org-profile-from-dms',
  UPDATE_ORDER_DMS_INFO: '/v1/update-order-dms-info',
} as const;
