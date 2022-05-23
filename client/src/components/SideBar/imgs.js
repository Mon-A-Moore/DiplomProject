import { ADMIN_ROUTE, BALANCE_ROUTE, COMPANY_ROUTE, GRAPH_ROUTE, HOMEPAGE_ROUTE } from '../../utils/consts';

const Imgs = [
		/* {
			path: HOMEPAGE_ROUTE,
			imgId: 0,
			alt: 'H',
		},
		{
			path: ADMIN_ROUTE,
			imgId: -1,
			alt: 'A',
		}, */
		{
			path: COMPANY_ROUTE+'/'+localStorage.companyId,
			imgId: 1,
			alt: 'C',
		},
		{
			path: BALANCE_ROUTE,
			imgId: 2,
			alt: 'B',
		},
		{
			path: GRAPH_ROUTE,
			imgId: 3,
			alt: 'B',
		},
	];

/*   const Imgs = [
		{
			path: HOMEPAGE_ROUTE,
			img: require ('../../icons/homepage.jpg'),
			alt: 'H',
		},
		{
			path: ADMIN_ROUTE,
			img: require('../../icons/admin.jpg'),
			alt: 'A',
		},
		{
			path: COMPANY_ROUTE+'/'+localStorage.companyId,
			img: require('../../icons/companepage.jpg'),
			alt: 'C',
		},
		{
			path: BALANCE_ROUTE,
			img:require ('../../icons/balancepage.jpg'),
			alt: 'B',
		},
		{
			path: GRAPH_ROUTE,
			img:require ('../../icons/factorypage.jpg'),
			alt: 'B',
		},
	]; */

export default Imgs;