import FeatureItem from '@/components/FeatureItem';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Feature, PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';

export default function Index({ features }: { features: PaginatedData<Feature> }) {
    console.log(features);
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Features</h2>}>
            <Head title="Features" />

            {features.data.map((feature) => (
                <FeatureItem key={feature.id} feature={feature} />
            ))}
        </AuthenticatedLayout>
    );
}
