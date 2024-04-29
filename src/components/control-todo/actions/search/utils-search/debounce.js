export const debounce = (fn, delay) => {
	let timerId; //хранение в замыкании

	return (...arg) => {
		clearTimeout(timerId);//отмена предыдущего
		timerId = setTimeout(fn, delay, ...arg);//вызов текущего
	}
}



//https://www.developerway.com/posts/debouncing-in-react

// Но опытный машинист может печатать со скоростью 70 слов в минуту, что составляет примерно 6 нажатий клавиш в секунду. В данной реализации это приведет к 6 onChangeсобытиям, т.е. 6 запросам к серверу в секунду! Вы уверены, что ваш бэкэнд справится с этим?

// Вместо того, чтобы отправлять этот запрос при каждом нажатии клавиши, мы можем немного подождать, пока пользователь перестанет печатать, а затем отправить все значение за один раз. Это то, что делает дебаунсинг. Если я применю debounce к своей onChangeфункции, она будет обнаруживать каждую мою попытку вызвать ее, и, если интервал ожидания еще не прошел, она отбросит предыдущий вызов и перезапустит часы «ожидания».


//  debounce просто функция, которая принимает функцию, возвращает другую функцию и имеет внутри трекер, который определяет, была ли переданная функция вызвана раньше указанного интервала. Если раньше - то пропускаем выполнение и перезапускаем часы. Если интервал прошел — вызвать переданную функцию.

// https://usehooks.com/usedebounce

// https://github.com/streamich/react-use/blob/master/docs/useDebounce.md

// https://usehooks-ts.com/react-hook/use-debounce

