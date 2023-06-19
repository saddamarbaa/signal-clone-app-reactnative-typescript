// Auth
export interface AuthLoginRequestType {
	email: string
	password: string
}

export interface AutRestPasswordRequestType {
	email: string
	password: string
}

export interface AutConfirmEmailRequestType {
	email: string
}

export interface AuthRequestType extends AuthLoginRequestType {
	name: string
	confirmPassword: string
}

export interface AuthRequestType extends AuthLoginRequestType {
	name: string
	confirmPassword: string
}

export type AuthUserType = {
	name: string
	email: string
	uuid: string
	photoURL: string
	createdAt?: string
	emailVerified: boolean
	isAnonymous: boolean
	lastLoginAt?: string
	phoneNumber?: string | null
}
