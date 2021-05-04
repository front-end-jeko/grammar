import * as Yup from 'yup';

export const userSigninSchema = Yup.object().shape({
	Email: Yup.string()
		.required('შეავსეთ ველი')
		.email('შეიყვანეთ ელ. ფოსტის მისამართი სწორ ფორმაში'),
	Password: Yup.string().required('შეავსეთ ველი'),
});

export const adminSignupSchema = Yup.object().shape({
	Email: Yup.string()
		.required('შეავსეთ ველი')
		.email('შეიყვანეთ ელ. ფოსტის მისამართი სწორ ფორმაში'),

	Username: Yup.string().required('შეავსეთ ველი'),
	Name: Yup.string().required('შეავსეთ ველი'),
	Surname: Yup.string().required('შეავსეთ ველი'),
	RegionName: Yup.string().required('შეავსეთ ველი'),
	School: Yup.string(),
	RoleId: 0,

	Password: Yup.string()
		.required('შეავსეთ ველი')
		.matches(
			/^(?=.*\d)(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[\W]).{8,}$/,
			'პაროლები არ ემთხვევა'
		),
	ConfirmPassword: Yup.string().when('Password', {
		is: (val) => (val && val.length > 0 ? true : false),
		then: Yup.string().oneOf([Yup.ref('Password')], 'პაროლები არ ემთხვევა'),
	}),
});
