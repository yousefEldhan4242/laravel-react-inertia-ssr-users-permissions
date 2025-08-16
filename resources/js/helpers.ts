import { User } from '@/types';

export function can (user:User,permission:string){
    return user.permissions.includes(permission);
}

export function hasRole(user:User,role:string){
    return user.roles.includes(role);
}
