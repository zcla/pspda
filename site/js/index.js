function mostraRoteiro(roteiro) {
	const selector = '#conteudo';
	$(selector).empty();
	$(selector).append('<div class="spinner-border">');
	$.getJSON(`data/roteiro/${roteiro}.json`, function(data) {
		$(selector).empty();
		$(selector).append(`
			<h1>${data.nome}</h1>
		`);
		if (data.nota) {
			$(selector).append(`
				<div class="alert alert-info">
					${data.nota}
				</div>
			`);
		}
		for (const parte of data.conteudo) {
			$(selector).append(`
				<div>${mostraParte(selector, parte)}</div>
			`);
		}
	});
}

function mostraParte(selector, parte) {
	let html = '???';
	switch (typeof parte) {
		case 'string':
			html = `<span class="texto">${parte}</span>`;
			break;
		case 'object':
			switch (parte.tipo) {
				case 'italico':
					html = `<span class="italico">${mostraParte(selector, parte.texto)}</span>`;
					break;
				case 'lista':
					html = '<ul class="lista">';
					for (const item of parte.itens) {
						html += `<li>${mostraParte(selector, item)}</li>`;
					}
					html += '</ul>';
					break;
				case 'negrito':
					html = `<span class="negrito">${mostraParte(selector, parte.texto)}</span>`;
					break;
				case 'paragrafo':
					html = '<p class="paragrafo">';
					for (const item of parte.texto) {
						html += `${mostraParte(selector, item)}`;
					}
					html += '</p>';
					break;
				case 'titulo':
					html = `<h${parte.nivel + 1} class="titulo${parte.nivel + 1}">${parte.texto}</h${parte.nivel + 1}>`;
					break;
				default:
					debugger;
					html = `<span class="erro">${parte}</span>`;
					console.log(`mostraParte(): Tipo "${parte.tipo}" desconhecido.`)
					break;
			}
			break;
		default:
			debugger;
			html = `<span class="erro">${parte}</span>`;
			console.log(`mostraParte(): Tipo de objeto "${typeof parte}" desconhecido.`)
			break;
	}
	return html;
}

window.onload = function() {
	const params = window.location.search.split(/\?|&/).filter((str) => str).map((str) => str.split('='));
	if (params.length > 0) {
		const roteiro = params.filter((arr) => arr[0] == 'roteiro')[0][1];
		mostraRoteiro(roteiro);
	}
}
