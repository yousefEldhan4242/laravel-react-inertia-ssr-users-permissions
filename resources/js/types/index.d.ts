import { Config } from 'ziggy-js';
import { PageProps } from '@inertiajs/react';
import { type LucideProps } from 'lucide-react';
import { ReactNode, ComponentType } from 'react';


// User type
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;  
  email_verified_at:string,
  permissions: string[],
  roles: string[],
}

export type PaginatedData<T=unknown> = {
  data:T[],
  links: Record<string,string>
}

export type Feature = {
  id:number,
  name:string,
  description:strirng,
  user:User,
  created_at:string,
  upvote_count:number,
  user_has_upvoted:boolean,
  user_has_downvoted:boolean
}

// Breadcrumb item type
export interface BreadcrumbItem {
  title: string;
  href: string;
  icon?: ComponentType<LucideProps> | ReactNode | string | ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

// Navigation item type
export interface NavItem {
  name?: string;
  href: string;
  title:string,
  icon: React.ReactNode|string;
  current?: boolean;
}




export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};


// Shared data type (passed from Laravel backend)
export interface SharedData extends PageProps {
  user: User;
  name:ReactNode;
  quote :{
    author:string,
    message:string,
  };
  flash?: {
    success?: string;
    error?: string;
  };
  // Add other shared properties as needed
}



export type IconType = ComponentType<LucideProps> | ReactNode;
