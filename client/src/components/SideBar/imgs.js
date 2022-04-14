import { ADMIN_ROUTE, BALANCE_ROUTE, COMPANY_ROUTE, HOMEPAGE_ROUTE } from '../../utils/consts';

const Imgs = [
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
	];

export default Imgs;