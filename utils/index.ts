export const sleep = (sec: number = 5*1000)=> {
	return new Promise((resolve)=>{
		setTimeout(() => {
			resolve(1)
		}, sec)
	})
}