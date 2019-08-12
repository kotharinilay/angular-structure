export interface EditUserModel {
    userId: string;
    firstName: string;
    initial: string;
    lastName: string;
    emailAddress: string;
    isExpired: boolean;
    isActive: boolean;
    isDeleted: boolean;
    userRoleId: string;
    phoneNumber: string;
}

export interface UserModel extends EditUserModel {
    clientId: string;
    password: string;
}

export interface ResetPasswordModel {
    userId: string;
    password: string;
    isChangepassword: boolean;
}
