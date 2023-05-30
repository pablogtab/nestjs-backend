import { UserRole } from "../userRole";

export interface UserGuardDto {
    email: string,
    idUser: number,
    role: UserRole,
}