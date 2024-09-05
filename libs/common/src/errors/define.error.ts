export const isNotEmpty = (name) =>`${name} không được phép trống`;
export const isString = (name) =>`${name} phải là chuỗi`;
export const isDuplicate = (name = '') =>`${name} đã tồn tại trong hệ thống. Vui lòng chỉnh sửa lại`;
export const isChangeDefault = () =>'Không thể thay đổi trường mặc định';
export const isRemoveDefault = () =>'Không thể xóa template mặc định';
export const isNumber = (name) =>`${name} phải là số`;