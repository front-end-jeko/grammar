import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';

import TextFieldComponent from '../../components/admin/reusable/TextFieldComponent';
import AppBarComponnent from '../../components/admin/header/AppBar';
import AppForm from '../../components/client/forms/AppForm';
import SubmitButton from '../../components/admin/reusable/SubmitButton';
import { getCookie } from '../../helpers/cookie';
import { accountService } from '../../services/user.service';
import { userSigninSchema } from '../../helpers/schema';

function Signin({ drawerIsOpen }) {
	const router = useRouter();

	const initialValues = {
		Email: 'tediashvili.jemali@gtu.ge',
		Password: 'Admin123!',
	};

	function onSubmit(data, action) {
		accountService
			.adminSignin(data.Email, data.Password)
			.then((res) => {
				router.push('/admin');
			})
			.catch((err) => {
				action.setSubmitting(false);
			});
	}

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<AppForm
				initialValues={initialValues}
				validateOnChange={true}
				validationSchema={userSigninSchema}
				onSubmit={onSubmit}
			>
				<Typography variant='h5' component='h5' align='center' gutterBottom>
					ავტორიზაცია
				</Typography>
				<Grid container spacing={5} justify='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='mb-30'>
							<TextFieldComponent placeholder='ელ ფოსტა' name='Email' />
						</div>
						<div className='mb-30'>
							<TextFieldComponent
								type='password'
								placeholder='პაროლი'
								name='Password'
							/>
						</div>

						<div className='flex space-center'>
							<SubmitButton
								title='ავტორიზაცია'
								size='large'
								color='primary'
								variant='contained'
							/>
						</div>
					</Grid>
				</Grid>
			</AppForm>
		</AppBarComponnent>
	);
}

export default Signin;

export async function getServerSideProps(ctx) {
	let cookie = '';

	if (getCookie('Drawer', ctx.req)) {
		cookie = getCookie('Drawer', ctx.req);
	} else {
		cookie = 'true';
	}

	return {
		props: { drawerIsOpen: cookie },
	};
}
