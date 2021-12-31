import { createGlobalStyle } from 'styled-components'
//linear-gradient(-45deg, #9febf2,#99f0ca,#3fcbfe,#26f3c3);
export const GlobalStyleBackground = createGlobalStyle`
body {
	background: linear-gradient(-45deg,#737575,#aebdf6,#9f9f9f,#d9d8d8);
	background-size: 400% 400%;
	animation: gradient 30s ease infinite;
	height: 100vh;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

`