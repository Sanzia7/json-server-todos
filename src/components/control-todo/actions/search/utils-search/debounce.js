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

//---------------------------------------------------------

// Дебаунсинг - это техника, используемая в JavaScript для ограничения частоты выполнения функции. В контексте React дебаггинг часто используется для управления частотой выполнения определенных действий, таких как обработка пользовательского ввода в поле поиска или изменение размеров событий.
//Debouncing is a technique used in JavaScript to limit the rate at which a function is executed.In the context of React, debouncing is often used to control the frequency of certain actions, such as handling user input in a search field or resizing events.

// Вот базовая реализация дебаггинга в React:
// import React, { useState } from 'react';

// const DebouncedComponent = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//
//   // Define the debounced function
//   const debounce = (func, delay) => {
//     let timer;
//     return function (...args) {
//       clearTimeout(timer);
//       timer = setTimeout(() => func.apply(this, args), delay);
//     };
//   };

//   // Define the function to be debounced
//   const handleSearch = debounce((value) => {
//     // Perform the search operation here
//     console.log('Searching for:', value);
//   }, 300); // Set the debounce delay to 300 milliseconds
//
//   const handleChange = (event) => {
//     const { value } = event.target;
//     setSearchTerm(value);
//     // Call the debounced function with the updated value
//     handleSearch(value);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleChange}
//         placeholder="Search..."
//       />
//     </div>
//   );
// };

// export default DebouncedComponent;

// In this example:
// У нас есть функциональный компонент DebouncedComponent, который содержит поле ввода для поиска.//We have a functional component DebouncedComponent that contains an input field for searching.

// Функция handleSearch обернута внутри функции debounce. Эта функция debounce гарантирует, что handleSearch будет вызвана только после определенной задержки (в данном случае 300 миллисекунд) с момента последнего вызова.// The handleSearch function is wrapped inside a debounce function. This debounce function ensures that handleSearch is only called after a certain delay (300 milliseconds in this case) since the last invocation.

// Функция handleChange вызывается каждый раз, когда значение поля ввода изменяется. Она обновляет состояние SearchTerm и вызывает функцию handleSearch с обновленным значением. Однако, поскольку функция handleSearch отложена, она будет вызываться не сразу при каждом нажатии клавиши, а после небольшой паузы с момента последнего нажатия.// The handleChange function is called every time the input field's value changes. It updates the searchTerm state and calls the handleSearch function with the updated value. However, because handleSearch is debounced, it won't be called immediately on every keystroke, but rather after a brief pause since the last keystroke.

// Такая техника отсрочки помогает сократить количество ненужных вызовов функций, особенно в сценариях, где быстрый пользовательский ввод может в противном случае вызвать множество ненужных операций.
// This debounce technique helps reduce unnecessary function calls, especially in scenarios where rapid user input might otherwise trigger numerous unnecessary operations
