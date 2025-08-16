import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import Radio from '@/components/Radio';
import TextInput from '@/components/TextInput';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Role {
    name: string;
    id: number;
}

export default function Edit({ roles, user,roleLabel }: { roles: Role[]; user: User,roleLabel:Record<string,string> }) {
    const { data, setData, processing, errors, put } = useForm({
        name: user.name,
        email: user.email,
        roles:user.roles
    });

    const onRoleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        if (e.target.checked){
            setData("roles",[e.target.value])
        }
    }

    const updateUser: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('user.update', user.id), {
            preserveScroll: true,
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit User : <b>"{user.name}"</b>
                </h2>
            }
        >
            <Head title={`Edit User "${user.name}"`} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
                    <form onSubmit={updateUser} className="w-full">
                        <div className="mb-8">
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                disabled
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="mb-8">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                disabled
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        <div className='mb-8'>
                            <InputLabel value="Role" />
                            {roles.map((role) => (
                                <label className="flex items-center mb-1" key={role.id}>
                                    <Radio
                                        checked={data.roles.includes(role.name)}
                                        name="roles"
                                        value={role.name}
                                        onChange={onRoleChange}
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{roleLabel[role.name]}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
