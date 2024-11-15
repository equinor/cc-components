import { useMemo } from 'react';
import { RouteObject, RouterProvider } from 'react-router-dom';
import { useNavigationModule } from '@equinor/fusion-framework-react-app/navigation';
import { ProjectPage } from '../../pages/ProjectPage';


const routes: RouteObject[] = [
	{
		path: '/',
		element: <ProjectPage />,
		children: [
			{
				path: ':contextId/*',
				element: <ProjectPage />,
				errorElement: <div>ohh no..</div>,
			},
		],
		errorElement: <div>ohh no1..</div>,
	},
];

export const AppRouter = () => {
	const navigation = useNavigationModule();
	const router = useMemo(() => navigation.createRouter(routes), []);
	return <RouterProvider router={router} />;
};
