export interface MessagesResponseType {
	id: string
	timestamp?: {
		seconds?: number
		nanoseconds?: number
	}
	message: string
	displayName: string
	email: string
	photoURL: string
}

export type ChatRoomType = {
	id: string
	chatName: string
	timestamp?: {
		seconds?: number
		nanoseconds?: number
	}
	photoURL?: string
}


export type ChatroomRequestType={
	name:string
}