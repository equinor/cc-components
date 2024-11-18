import { useMemo } from 'react';
import { RouteObject, RouterProvider, useRouteError } from 'react-router-dom';
import { useNavigationModule } from '@equinor/fusion-framework-react-app/navigation';
import { ProjectPage } from '../../pages/ProjectPage';



const ErrorPage = () => {
	const error = useRouteError() as Error;

	return( <div>
			{error && (
		<div>
				<h4>{error.name}</h4>
				<p>{error.message}</p>
			</div>
			)}
		</div>);
};

const routes: RouteObject[] = [
	{
		path: '/',
		element: <ProjectPage />,
		children: [
			{
				path: ':contextId/*',
				element: <ProjectPage />,
				errorElement: <ErrorPage/>,
			},
		],
		errorElement: <ErrorPage/>,
	},
];

export const AppRouter = () => {
	const navigation = useNavigationModule();
	const router = useMemo(() => navigation.createRouter(routes), []);
	return <RouterProvider router={router} />;
};
