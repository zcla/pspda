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
		for (const passo of data.passos) {
			$(selector).append(`
				<div>${mostraPasso(selector, passo)}</div>
			`);
		}
	});
}

function mostraPasso(selector, passo) {
	let html = '???';
	switch (typeof passo) {
		case 'string':
			html = `<span class="texto">${passo}</span>`;
			break;
		case 'object':
			switch (passo.tipo) {
				case 'italico':
					html = `<span class="italico">${mostraPasso(selector, passo.texto)}</span>`;
					break;
				case 'lista':
					html = '<ul class="lista">';
					for (const item of passo.itens) {
						html += `<li>${mostraPasso(selector, item)}</li>`;
					}
					html += '</ul>';
					break;
				case 'negrito':
					html = `<span class="negrito">${mostraPasso(selector, passo.texto)}</span>`;
					break;
				case 'paragrafo':
					html = '<p class="paragrafo">';
					for (const item of passo.texto) {
						html += `${mostraPasso(selector, item)}`;
					}
					html += '</p>';
					break;
				case 'titulo':
					html = `<h${passo.nivel + 1} class="titulo${passo.nivel + 1}">${passo.texto}</h${passo.nivel + 1}>`;
					break;
				default:
					debugger;
					html = `<span class="erro">${passo}</span>`;
					console.log(`mostraPasso(): Tipo "${passo.tipo}" desconhecido.`)
					break;
			}
			break;
		default:
			debugger;
			html = `<span class="erro">${passo}</span>`;
			console.log(`mostraPasso(): Tipo de objeto "${typeof passo}" desconhecido.`)
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
