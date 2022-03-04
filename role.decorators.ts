import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enum/entities.role.enum";


export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);