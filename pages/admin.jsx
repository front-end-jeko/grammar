import React from 'react';
import AppBarComponnent from '../components/admin/header/AppBar';
import { getCookie } from '../helpers/cookie';
import redirect from '../helpers/redirect';

function Adminpage() {
	return <AppBarComponnent isOpen={true}></AppBarComponnent>;
}

export default Adminpage;

// Adminpage.getInitialProps = async (ctx) => {
// 	if (getCookie('access_Token', ctx.req)) {
// 		redirect('/admin/', ctx);
// 	} else {
// 		redirect('/admin/signin', ctx);
// 	}
// };
