import Admin from "./pages/Admin/Admin";
import {ADMIN_ROUTE, LOGIN_ROUTE,REGISTRATION_ROUTE,BALANCE_ROUTE,COMPANY_ROUTE,HOMEPAGE_ROUTE, COMPANY_REGISTRATION_ROUTE, GRAPH_ROUTE} from "./utils/consts";

import Homepage from "./pages/Homepage/Homepage";
import CompanyCreate from "./pages/CompanyCreate/CompanyCreate";
import CompanyPage from "./pages/CompanyPage/CompanyPage";
import BalancePage from "./pages/BalancePage/BalancePage";
import Auth from "./pages/Auth/Auth";
import Graph from "./pages/Graph/Graph"


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Element: Admin,

    },
    {
        path: COMPANY_ROUTE+ '/:id',
        Element: CompanyPage,
    },
	{
			path: BALANCE_ROUTE,
			Element: BalancePage,
			
	},
	{
		path:COMPANY_REGISTRATION_ROUTE,
		Element: CompanyCreate,
	},
	{
		path: GRAPH_ROUTE,
		Element: Graph,
	},

	
]

export const publicRoutes = [
    {
        path: HOMEPAGE_ROUTE,
        Element: Homepage,				
    },
    {
        path: LOGIN_ROUTE,
        Element: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Element: Auth
    },
		{
			path:COMPANY_REGISTRATION_ROUTE,
			Element: CompanyCreate,
		},
		
]
