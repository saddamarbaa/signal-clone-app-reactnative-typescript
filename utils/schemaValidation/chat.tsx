import { z as zod } from 'zod'

export const addChatroomSchemaValidation = zod.object({
	name: zod
		.string()
		.nonempty({ message: 'Name is required' })
		.min(3, { message: 'Name must be at least 3 characters' })
		.max(15, { message: 'Name must not exceed 15 characters' }),
})
