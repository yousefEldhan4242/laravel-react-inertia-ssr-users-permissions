import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps, PaginatedData, User } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Index({ users }: PageProps<{ users: PaginatedData<User> }>) {

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Users</h2>}>
            <Head title="Users" />

            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Roles
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user) => (
                            <tr key={user.id} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.created_at}</td>
                                <td className="px-6 py-4">{user.roles.join(", ")}</td>
                                <td className="px-6 py-4">
                                <Link href={route("user.edit",user.id)} className='text-blue-500'>
                                    Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
