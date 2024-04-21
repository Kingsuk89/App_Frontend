import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Verify from './components/auth/Verify';
import RestForm from './components/auth/RestForm';
import ResetPass from './components/auth/ResetPass';
import Profile from './components/user/Profile';
import Contact from './components/contact/Contact';
import Protected from './components/utils/Protected';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: '/profile',
				element: (
					<Protected>
						<Profile />
					</Protected>
				),
			},
			{
				path: '/contact',

				element: (
					<Protected>
						<Contact />
					</Protected>
				),
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signUp',
		element: <Signup />,
	},
	{
		path: '/verify/:email',
		element: <Verify />,
	},
	{
		path: '/reset-form',
		element: <RestForm />,
	},
	{
		path: '/reset/:email',
		element: <ResetPass />,
	},
]);

export default router;
