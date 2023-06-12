// Auth
export interface AuthLoginRequestType {
	email: string
	password: string
}

export interface AutRestPasswordRequestType {
	email: string
	password: string
}

export interface AuthRequestType extends AuthLoginRequestType {
	name: string
	confirmPassword: string
}
