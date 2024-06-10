export type ActionResult<T> = {
	data: T;
	isSuccess: boolean;
	message: string;
}
