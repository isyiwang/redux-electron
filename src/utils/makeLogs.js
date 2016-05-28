
export default function makeLogs(action, prevState, nextState) {
	let logBuffer = [];

	// time
	let time = new Date();
	time = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`;
	logBuffer.push([ new Decorated(action.type, 'title'), time ]);

	// previous state
	logBuffer.push([ new Decorated('    prev state', 'prev'), prevState ]);

	// log action
	logBuffer.push([ new Decorated('    dispatching', 'action'), action ]);

	// log next state
	logBuffer.push([ new Decorated('    next state', 'next'), nextState ]);

	return logBuffer;
}

export class Decorated
{
	constructor(text, style) {
		this.text = text;
		this.style = style;
	}
}
